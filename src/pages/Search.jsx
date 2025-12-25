import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { DefaultCard } from "../components/DefaultCard.jsx";
import { Category } from "../utils/Data.js";
import MovieCard from "../components/MovieCard.jsx";
import { CircularProgress } from "@mui/material";

const SearchMain = styled.div`
  padding: 20px 30px;
  padding-bottom: 200px;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media (max-width: 768px) {
    padding: 20px 9px;
  }
`;
const Heading = styled.div`
  align-items: flex-start;
  color: ${({ theme }) => theme.text_primary};
  font-size: 22px;
  font-weight: 540;
  margin: 10px 14px;
`;
const BrowseAll = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 14px;
`;
const SearchedCards = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 14px;
  @media (max-width: 768px) {
    justify-content: center;
    padding: 6px;
  }
`;
const Categories = styled.div`
  margin: 20px 10px;
`;
const Search_whole = styled.div`
  max-width: 700px;
  display: flex;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  border-radius: 30px;
  cursor: pointer;
  padding: 12px 16px;
  justify-content: flex-start;
  align-items: center;
  gap: 6px;
  color: ${({ theme }) => theme.text_secondary};
`;

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;
const DisplayNo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  color: ${({ theme }) => theme.text_primary};
  font-size: 18px;
  padding: 40px;
`;

const Search = ({ movies }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    // Debounce search to avoid filtering on every keystroke
    const timer = setTimeout(() => {
      if (searchQuery.trim() === "") {
        setSearchedMovies([]);
        setSearched(false);
        setLoading(false);
        return;
      }

      setLoading(true);
      setSearched(true);

      // Filter movies by title (case-insensitive)
      const filtered = movies.filter((movie) =>
        movie.Title?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchedMovies(filtered);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, movies]);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value.trim() !== "") {
      setLoading(true);
    }
  };

  return (
    <SearchMain>
      <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <Search_whole>
          <SearchOutlinedIcon sx={{ color: "inherit" }} />
          <input
            type="text"
            placeholder="Search Movie"
            value={searchQuery}
            onChange={handleInputChange}
            style={{
              border: "none",
              outline: "none",
              width: "100%",
              background: "inherit",
              color: "inherit",
              fontSize: "16px",
            }}
          />
        </Search_whole>
      </div>

      {loading && (
        <Loader>
          <CircularProgress />
        </Loader>
      )}

      {!loading && searched && searchedMovies.length === 0 && (
        <DisplayNo>No movies found matching "{searchQuery}"</DisplayNo>
      )}

      {!loading && searched && searchedMovies.length > 0 && (
        <Categories>
          <Heading>Search Results ({searchedMovies.length})</Heading>
          <SearchedCards>
            {searchedMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                posterLink={movie.PosterLink}
                title={movie.Title}
                desc={movie.Description}
                rating={movie.Rating}
                id={movie.id}
              />
            ))}
          </SearchedCards>
        </Categories>
      )}

      {!searched && (
        <Categories>
          <Heading>Browse All</Heading>
          <BrowseAll>
            {Category.map((category) => (
              <DefaultCard key={category.name} category={category} />
            ))}
          </BrowseAll>
        </Categories>
      )}
    </SearchMain>
  );
};

export default Search;


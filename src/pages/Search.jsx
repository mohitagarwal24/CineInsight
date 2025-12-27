import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FilterListIcon from "@mui/icons-material/FilterList";
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

const SearchContainer = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
  }
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
  transition: border-color 0.3s ease;
  
  &:focus-within {
    border-color: ${({ theme }) => theme.primary};
  }
`;

const FilterWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const FilterSelect = styled.select`
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  border: 1px solid ${({ theme }) => theme.text_secondary};
  border-radius: 20px;
  padding: 10px 16px;
  font-size: 14px;
  cursor: pointer;
  outline: none;
  appearance: none;
  padding-right: 32px;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23b1b2b3'%3e%3cpath d='M7 10l5 5 5-5z'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 8px center;
  background-size: 20px;
  transition: border-color 0.3s ease;
  
  &:hover, &:focus {
    border-color: ${({ theme }) => theme.primary};
  }
`;

const FilterLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${({ theme }) => theme.text_secondary};
  font-size: 14px;
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

const ResultsInfo = styled.div`
  color: ${({ theme }) => theme.text_secondary};
  font-size: 14px;
  margin-left: 14px;
`;

const Search = ({ movies }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [ratingFilter, setRatingFilter] = useState("all");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim() === "") {
        setSearchedMovies([]);
        setSearched(false);
        setLoading(false);
        return;
      }

      setLoading(true);
      setSearched(true);

      let filtered = movies.filter((movie) =>
        movie.Title?.toLowerCase().includes(searchQuery.toLowerCase())
      );

      // Apply rating filter
      if (ratingFilter !== "all") {
        const minRating = parseFloat(ratingFilter);
        filtered = filtered.filter((movie) => 
          parseFloat(movie.Rating) >= minRating
        );
      }

      setSearchedMovies(filtered);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, movies, ratingFilter]);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value.trim() !== "") {
      setLoading(true);
    }
  };

  const handleRatingChange = (e) => {
    setRatingFilter(e.target.value);
    if (searchQuery.trim() !== "") {
      setLoading(true);
    }
  };

  return (
    <SearchMain>
      <SearchContainer>
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
        
        <FilterWrapper>
          <FilterLabel>
            <FilterListIcon sx={{ fontSize: 18 }} />
            Rating:
          </FilterLabel>
          <FilterSelect value={ratingFilter} onChange={handleRatingChange}>
            <option value="all">All</option>
            <option value="7">7+</option>
            <option value="8">8+</option>
            <option value="9">9+</option>
          </FilterSelect>
        </FilterWrapper>
      </SearchContainer>

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
          <Heading>Search Results</Heading>
          <ResultsInfo>
            Found {searchedMovies.length} movie{searchedMovies.length !== 1 ? 's' : ''}
            {ratingFilter !== "all" && ` with rating ${ratingFilter}+`}
          </ResultsInfo>
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



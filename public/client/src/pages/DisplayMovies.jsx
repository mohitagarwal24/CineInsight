import React from "react";
import { useParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import styled from "styled-components";

const DashboardMain = styled.div`
  padding: 20px 30px;
  padding-bottom: 200px;
  height: 100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media (max-width: 768px) {
    padding: 6px 10px;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  ${({ box, theme }) =>
    box &&
    `
background-color: ${theme.bg};
  border-radius: 10px;
  padding: 20px 30px;
`}
  background-color: ${({ theme }) => theme.bg};
  border-radius: 10px;
  padding: 20px 30px;
`;

const Topic = styled.div`
  color: ${({ theme }) => theme.text_primary};
  font-size: 24px;
  font-weight: 540;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const Reviews = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  padding: 18px 6px;
  //center the items if only one item present
  @media (max-width: 550px) {
    justify-content: center;
  }
`;

const DisplayMovies = ({movies}) => {
  const { genre } = useParams();
  const FilterMovies =(type)=>{
    return movies.filter((movie)=> movie.Genre.includes(type))
  }

  // console.log(FilterMovies(genre))

  return (
    <DashboardMain>
      <FilterContainer key={genre}>
        <Topic>All {genre} Movies</Topic>
        <Reviews>
          {FilterMovies(genre).map((movie) => (
            <div key={movie.id}>
              <MovieCard
                posterLink={movie.PosterLink}
                title={movie.Title}
                desc={movie.Description}
                rating={movie.Rating}
                id={movie.id}
              />
            </div>
          ))}
        </Reviews>
      </FilterContainer>
    </DashboardMain>
  );
};

export default DisplayMovies;

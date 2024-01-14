import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import MovieCard from "../components/MovieCard";

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

const Span = styled.div`
  color: ${({ theme }) => theme.text_secondary};
  font-size: 16px;
  font-weight: 400;
  cursor: pointer;
  @media (max-width: 768px) {
    font-size: 14px;
  }
  color: ${({ theme }) => theme.primary};
  &:hover {
    transition: 0.2s ease-in-out;
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

const Dashboard = ({ movies }) => {
  const navigate = useNavigate();

  const filterAndLimitMoviesByGenre = (genre) => {
    return movies.filter((movie) => movie.Genre.includes(genre)).slice(0, 6);
  };

  return (
    <DashboardMain>
      {/* You can create an array of genres and map over it */}
      {["Comedy", "Drama", "Action", "Fantasy", "Romance", "Horror"].map(
        (genre) => (
          <FilterContainer key={genre}>
            <Topic>
              {genre}
              <Span onClick={() => navigate(`/showmovies/${genre}`)}>
                {" "}
                Show All
              </Span>
            </Topic>
            <Reviews>
              {filterAndLimitMoviesByGenre(genre).map((movie) => (
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
        )
      )}
    </DashboardMain>
  );
};

export default Dashboard;

import React, { useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import HeroBanner from "../components/HeroBanner";
import StatsSection from "../components/StatsSection";
import SkeletonCard from "../components/SkeletonCard";
import ScrollToTop from "../components/ScrollToTop";

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
  @media (max-width: 550px) {
    justify-content: center;
  }
`;

const TrendingSection = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bg};
  border-radius: 10px;
  padding: 20px 30px;
`;

const TrendingScroll = styled.div`
  display: flex;
  gap: 16px;
  padding: 18px 6px;
  overflow-x: auto;
  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => theme.primary} transparent;
  
  &::-webkit-scrollbar {
    height: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.primary};
    border-radius: 3px;
  }
`;

const TrendingCardWrapper = styled.div`
  position: relative;
  flex-shrink: 0;
`;

const RankBadge = styled.div`
  position: absolute;
  top: -8px;
  left: -8px;
  width: 32px;
  height: 32px;
  background: ${({ theme }) => theme.primary};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
  color: white;
  z-index: 10;
  box-shadow: 0 2px 10px rgba(190, 26, 219, 0.4);
`;

const SkeletonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  padding: 18px 6px;
`;

const Dashboard = ({ movies }) => {
  const navigate = useNavigate();
  const dashboardRef = useRef(null);
  const isLoading = movies.length === 0;

  const filterAndLimitMoviesByGenre = (genre) => {
    return movies.filter((movie) => movie.Genre?.includes(genre)).slice(0, 6);
  };

  const getTrendingMovies = () => {
    return [...movies]
      .filter(m => m.Rating)
      .sort((a, b) => parseFloat(b.Rating) - parseFloat(a.Rating))
      .slice(0, 10);
  };

  return (
    <DashboardMain ref={dashboardRef}>
      {/* Hero Banner */}
      {!isLoading && <HeroBanner movies={movies} />}
      
      {/* Stats Section */}
      {!isLoading && <StatsSection movies={movies} />}
      
      {/* Trending Section */}
      {!isLoading && (
        <TrendingSection>
          <Topic>Trending Now</Topic>
          <TrendingScroll>
            {getTrendingMovies().map((movie, index) => (
              <TrendingCardWrapper key={movie.id}>
                <RankBadge>{index + 1}</RankBadge>
                <MovieCard
                  posterLink={movie.PosterLink}
                  title={movie.Title}
                  desc={movie.Description}
                  rating={movie.Rating}
                  id={movie.id}
                />
              </TrendingCardWrapper>
            ))}
          </TrendingScroll>
        </TrendingSection>
      )}

      {/* Loading Skeleton */}
      {isLoading && (
        <FilterContainer>
          <Topic>Loading Movies...</Topic>
          <SkeletonContainer>
            {[...Array(6)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </SkeletonContainer>
        </FilterContainer>
      )}

      {/* Genre Sections */}
      {!isLoading && ["Comedy", "Drama", "Action", "Fantasy", "Romance", "Horror"].map(
        (genre) => (
          <FilterContainer key={genre}>
            <Topic>
              {genre}
              <Span onClick={() => navigate(`/showmovies/${genre}`)}>
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
      
      {/* Scroll to Top Button */}
      <ScrollToTop containerRef={dashboardRef} />
    </DashboardMain>
  );
};

export default Dashboard;

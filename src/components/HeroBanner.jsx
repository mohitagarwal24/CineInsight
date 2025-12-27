import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StarIcon from '@mui/icons-material/Star';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(1.05);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const BannerContainer = styled.div`
  position: relative;
  width: 100%;
  height: 350px;
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 10px;
  
  @media (max-width: 768px) {
    height: 280px;
  }
`;

const BannerImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${({ src }) => src});
  background-size: cover;
  background-position: center;
  animation: ${fadeIn} 0.8s ease-out;
`;

const GradientOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.9) 0%,
    rgba(0, 0, 0, 0.7) 40%,
    rgba(0, 0, 0, 0.3) 100%
  );
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 32px 40px;
  max-width: 60%;
  
  @media (max-width: 768px) {
    max-width: 85%;
    padding: 24px;
  }
`;

const MovieTitle = styled.h1`
  color: #fff;
  font-size: 36px;
  font-weight: 700;
  margin: 0 0 12px 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  
  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const MovieDescription = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
  line-height: 1.6;
  margin: 0 0 16px 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  
  @media (max-width: 768px) {
    font-size: 13px;
    -webkit-line-clamp: 2;
  }
`;

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
`;

const RatingBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  background: rgba(255, 193, 7, 0.2);
  padding: 6px 12px;
  border-radius: 20px;
  color: #ffc107;
  font-weight: 600;
  font-size: 14px;
`;

const GenreTag = styled.span`
  background: rgba(190, 26, 219, 0.3);
  color: #e1bee7;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
`;

const TrailerButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 30px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: fit-content;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 20px rgba(190, 26, 219, 0.4);
  }
`;

const DotsContainer = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  display: flex;
  gap: 8px;
  z-index: 3;
`;

const Dot = styled.button`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  background: ${({ active }) => active ? '#be1adb' : 'rgba(255, 255, 255, 0.5)'};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ active }) => active ? '#be1adb' : 'rgba(255, 255, 255, 0.8)'};
  }
`;

const HeroBanner = ({ movies }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Get top rated movies for the banner
  const topMovies = movies
    .filter(movie => movie.Rating && movie.PosterLink)
    .sort((a, b) => parseFloat(b.Rating) - parseFloat(a.Rating))
    .slice(0, 5);

  useEffect(() => {
    if (topMovies.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % topMovies.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, [topMovies.length]);

  if (topMovies.length === 0) return null;

  const currentMovie = topMovies[currentIndex];

  const handleTrailerClick = () => {
    if (currentMovie.Trailer) {
      window.open(currentMovie.Trailer, '_blank');
    }
  };

  return (
    <BannerContainer>
      <BannerImage key={currentIndex} src={currentMovie.PosterLink} />
      <GradientOverlay />
      <ContentWrapper>
        <MovieTitle>{currentMovie.Title}</MovieTitle>
        <MovieDescription>{currentMovie.Description}</MovieDescription>
        <MetaRow>
          <RatingBadge>
            <StarIcon sx={{ fontSize: 16 }} />
            {currentMovie.Rating}
          </RatingBadge>
          {currentMovie.Genre && currentMovie.Genre.slice(0, 2).map((genre, idx) => (
            <GenreTag key={idx}>{genre}</GenreTag>
          ))}
        </MetaRow>
        <TrailerButton onClick={handleTrailerClick}>
          <PlayArrowIcon />
          Watch Trailer
        </TrailerButton>
      </ContentWrapper>
      <DotsContainer>
        {topMovies.map((_, idx) => (
          <Dot
            key={idx}
            active={idx === currentIndex}
            onClick={() => setCurrentIndex(idx)}
          />
        ))}
      </DotsContainer>
    </BannerContainer>
  );
};

export default HeroBanner;

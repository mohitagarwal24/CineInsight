import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import MovieIcon from '@mui/icons-material/Movie';
import CategoryIcon from '@mui/icons-material/Category';
import StarIcon from '@mui/icons-material/Star';

const countUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Container = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    gap: 12px;
  }
`;

const StatCard = styled.div`
  flex: 1;
  min-width: 150px;
  background: ${({ theme }) => theme.bg};
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  animation: ${countUp} 0.5s ease-out;
  animation-delay: ${({ delay }) => delay}ms;
  animation-fill-mode: both;
  
  @media (max-width: 768px) {
    padding: 16px;
    min-width: 120px;
  }
`;

const IconWrapper = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ color }) => color}20;
  color: ${({ color }) => color};
  
  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }
`;

const StatInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const StatValue = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const StatLabel = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.text_secondary};
`;

const useCountAnimation = (target, duration = 1000) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (target === 0) return;
    
    const startTime = Date.now();
    const step = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(target * easeOut));
      
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    
    requestAnimationFrame(step);
  }, [target, duration]);
  
  return count;
};

const StatsSection = ({ movies }) => {
  const totalMovies = movies.length;
  const genres = [...new Set(movies.flatMap(m => m.Genre || []))];
  const avgRating = movies.length > 0 
    ? (movies.reduce((sum, m) => sum + (parseFloat(m.Rating) || 0), 0) / movies.length).toFixed(1)
    : 0;

  const animatedMovies = useCountAnimation(totalMovies);
  const animatedGenres = useCountAnimation(genres.length);

  return (
    <Container>
      <StatCard delay={0}>
        <IconWrapper color="#be1adb">
          <MovieIcon />
        </IconWrapper>
        <StatInfo>
          <StatValue>{animatedMovies}</StatValue>
          <StatLabel>Total Movies</StatLabel>
        </StatInfo>
      </StatCard>
      
      <StatCard delay={100}>
        <IconWrapper color="#4caf50">
          <CategoryIcon />
        </IconWrapper>
        <StatInfo>
          <StatValue>{animatedGenres}</StatValue>
          <StatLabel>Genres</StatLabel>
        </StatInfo>
      </StatCard>
      
      <StatCard delay={200}>
        <IconWrapper color="#ffc107">
          <StarIcon />
        </IconWrapper>
        <StatInfo>
          <StatValue>{avgRating}</StatValue>
          <StatLabel>Avg Rating</StatLabel>
        </StatInfo>
      </StatCard>
    </Container>
  );
};

export default StatsSection;

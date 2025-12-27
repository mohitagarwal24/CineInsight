import React from 'react';
import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: 200px 0;
  }
`;

const Card = styled.div`
  background-color: ${({ theme }) => theme.card};
  max-width: 220px;
  height: 280px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 16px;
  border-radius: 6px;
  box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.1);
`;

const SkeletonBase = styled.div`
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.bg} 0%,
    ${({ theme }) => theme.bgLight} 50%,
    ${({ theme }) => theme.bg} 100%
  );
  background-size: 400px 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: 6px;
`;

const ImageSkeleton = styled(SkeletonBase)`
  width: 220px;
  height: 140px;
  margin-bottom: 14px;
`;

const TitleSkeleton = styled(SkeletonBase)`
  width: 80%;
  height: 18px;
  margin-bottom: 10px;
`;

const DescriptionSkeleton = styled(SkeletonBase)`
  width: 100%;
  height: 12px;
  margin-bottom: 6px;
`;

const RatingSkeleton = styled(SkeletonBase)`
  width: 50px;
  height: 16px;
  margin-top: 10px;
`;

const SkeletonCard = () => {
  return (
    <Card>
      <ImageSkeleton />
      <div style={{ width: '100%' }}>
        <TitleSkeleton />
        <DescriptionSkeleton />
        <DescriptionSkeleton style={{ width: '70%' }} />
        <RatingSkeleton />
      </div>
    </Card>
  );
};

export default SkeletonCard;

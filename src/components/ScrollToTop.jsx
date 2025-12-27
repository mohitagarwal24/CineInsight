import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(20px);
  }
`;

const Button = styled.button`
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${({ theme }) => theme.primary};
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 4px 20px rgba(190, 26, 219, 0.4);
  z-index: 1000;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  animation: ${({ visible }) => visible ? fadeIn : fadeOut} 0.3s ease;
  pointer-events: ${({ visible }) => visible ? 'auto' : 'none'};
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 25px rgba(190, 26, 219, 0.5);
  }
  
  @media (max-width: 768px) {
    bottom: 20px;
    right: 20px;
    width: 44px;
    height: 44px;
  }
`;

const ScrollToTop = ({ containerRef }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const container = containerRef?.current;
    if (!container) return;

    const handleScroll = () => {
      setVisible(container.scrollTop > 300);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [containerRef]);

  const scrollToTop = () => {
    const container = containerRef?.current;
    if (container) {
      container.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  return (
    <Button visible={visible} onClick={scrollToTop}>
      <KeyboardArrowUpIcon />
    </Button>
  );
};

export default ScrollToTop;

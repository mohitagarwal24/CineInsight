import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Card = styled.div`
width:150px;
height:150px;
border-radius:0.6rem;
padding:1rem;
cursor: pointer;
transition: all 0.4s ease-in-out;
&:hover{
  transform: translateY(-8px);
  box-shadow: 0 0 18px 0 rgba(0, 0, 0, 0.3);
  filter: brightness(1.3);
}
@media (max-width: 768px) {
  width: 250px;
}
`
const DefaultCardText = styled.div`
color: #F2F3F4;
font-size:1.4rem;
font-weight:600;

`
const DefaultCardImg=styled.img`
height:90px;
width:80px;
object-fit: cover;
clip-path: polygon(0 0, 100% 0, 100% 66%, 0 98%);
transform:rotate(20deg);
`
const FlexContainer = styled.div`
width: 100%;
height: 100%;
display: flex;
justify-content: flex-end;
align-items: flex-end;
`

export const DefaultCard = ({category}) => {
  const navigate = useNavigate();

  const handleCategoryClick = () => {
    navigate(`/showmovies/${category.name}`);
  };

  return (
    <Card 
      style={{"backgroundColor":`${category.color}`}}
      onClick={handleCategoryClick}
    >
        <DefaultCardText>
            {category.name}
        </DefaultCardText>
        <FlexContainer>
        <DefaultCardImg
            src={category.img}
            alt="movie-image"
        />
        </FlexContainer>
    </Card>
  )
}

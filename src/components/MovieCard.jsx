import React from 'react';
import styled from "styled-components";
import { IconButton } from "@mui/material";
import StarImage from "../images/star image.jpg";
import { FavoriteRounded, StarRounded} from "@mui/icons-material";
import FavoriteIcon from "@mui/icons-material/Favorite"
import { useNavigate } from 'react-router-dom';


const Card = styled.div`
position: relative;
text-decoration: none;
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
&:hover{
  cursor: pointer;
  transform: translateY(-8px);
  transition: all 0.4s ease-in-out;
  box-shadow: 0 0 18px 0 rgba(0, 0, 0, 0.3);
  filter: brightness(1.3);
}
`;
const CardImage = styled.img`
object-fit: cover;
width: 220px;
height: 140px;
border-radius: 6px;
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
&:hover{
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.4);
}
`;
const Favorite = styled(IconButton)`
color:white;
  top: 8px;
  right: 6px;
  padding: 6px !important;
  border-radius: 50%;
  z-index: 100;
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.text_secondary + 95} !important;
  color: white !important;
  position: absolute !important;
  backdrop-filter: blur(4px);
  box-shadow: 0 0 12px 3px #222423 !important;
`;
const Top = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 150px;
position: relative;
`;
const CardInformation = styled.div`
display:flex;
flex-direction: column;
align-items: flex-start;
justify-content: space-evenly;
font-weight:450;
padding: 14px 0px 0px 0px;
width: 100%;
`;
const Title = styled.div`
overflow: hidden;
margin: 5px 0px;
  display: -webkit-box;
  max-width: 100%;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${({ theme }) => theme.text_primary};
`;
const Description = styled.div`
overflow: hidden;
display: -webkit-box;
max-width: 100%;
-webkit-line-clamp: 3;
-webkit-box-orient: vertical;
overflow: hidden;
text-overflow: ellipsis;
color: ${({ theme }) => theme.text_secondary};
font-size: 12px;
`;
const IdmbRating = styled.div`
display: flex;
align-items: baseline;
gap: 4px;
height: 30px;

`;
const StarIcon = styled.img`
    height: 16px;
    align-self: end;
    margin-bottom: 2px;
`;
const Rating = styled.div`
align-self:end;
overflow: hidden;
font-size: 14px;
  display: -webkit-box;
  max-width: 100%;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${({ theme }) => theme.text_primary};
`;

const MovieCard = ({posterLink, title, desc, rating, id }) => {
  const navigate = useNavigate();

  const handleMovieClick = (ID) => {
    navigate(`/movie/${ID}`);
  };

  return (
    <Card onClick={() => handleMovieClick(id)}>
        <Top>
            <Favorite>
                <FavoriteIcon/>
            </Favorite>
            <CardImage src={posterLink}/>
        </Top>
        <CardInformation>
            <Title>{title}</Title>
            <Description>{desc}</Description>
            <IdmbRating>
                <StarIcon src={StarImage}/>
                <Rating> {rating}</Rating>
            </IdmbRating>
        </CardInformation>
    </Card>
  )
};

export default MovieCard;
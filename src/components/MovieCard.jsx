import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { IconButton } from "@mui/material";
import StarImage from "../images/star image.jpg";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { doc, setDoc, deleteDoc, getDoc } from 'firebase/firestore';

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
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  overflow: hidden;
  
  &:hover {
    cursor: pointer;
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 12px 28px 0 rgba(0, 0, 0, 0.35);
  }
`;

const CardImage = styled.img`
  object-fit: cover;
  width: 220px;
  height: 140px;
  border-radius: 6px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
  transition: all 0.4s ease;
  
  ${Card}:hover & {
    transform: scale(1.05);
  }
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
  width: 220px;
  height: 140px;
  border-radius: 6px;
  background: linear-gradient(
    to top,
    rgba(190, 26, 219, 0.7) 0%,
    transparent 50%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 12px;
  
  ${Card}:hover & {
    opacity: 1;
  }
`;

const ViewDetailsText = styled.span`
  color: white;
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  transform: translateY(10px);
  opacity: 0;
  transition: all 0.3s ease 0.1s;
  
  ${Card}:hover & {
    transform: translateY(0);
    opacity: 1;
  }
`;

const Favorite = styled(IconButton)`
  color: white;
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
  transition: transform 0.2s ease-in-out;
  
  &:hover {
    transform: scale(1.15);
  }
`;

const Top = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
  position: relative;
`;

const CardInformation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-evenly;
  font-weight: 450;
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
  transition: color 0.3s ease;
  
  ${Card}:hover & {
    color: ${({ theme }) => theme.primary};
  }
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

const StarIcon2 = styled.img`
  height: 16px;
  align-self: end;
  margin-bottom: 2px;
`;

const Rating = styled.div`
  align-self: end;
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

const MovieCard = ({ posterLink, title, desc, rating, id }) => {
  const navigate = useNavigate();
  const [isFavourite, setIsFavourite] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const checkFavourite = async () => {
      if (user && id) {
        try {
          const favDocRef = doc(db, "Users", user.uid, "Favourites", id);
          const favDoc = await getDoc(favDocRef);
          setIsFavourite(favDoc.exists());
        } catch (error) {
          console.error("Error checking favourite:", error);
        }
      }
    };
    checkFavourite();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleMovieClick = (ID) => {
    navigate(`/movie/${ID}`);
  };

  const handleFavouriteClick = async (e) => {
    e.stopPropagation();
    
    if (!user) {
      alert("Please sign in to add favourites");
      return;
    }

    setLoading(true);
    try {
      const favDocRef = doc(db, "Users", user.uid, "Favourites", id);
      
      if (isFavourite) {
        await deleteDoc(favDocRef);
        setIsFavourite(false);
      } else {
        await setDoc(favDocRef, {
          movieId: id,
          posterLink,
          title,
          desc,
          rating,
          addedAt: new Date().toISOString()
        });
        setIsFavourite(true);
      }
    } catch (error) {
      console.error("Error updating favourite:", error);
    }
    setLoading(false);
  };

  return (
    <Card onClick={() => handleMovieClick(id)}>
      <Top>
        <Favorite onClick={handleFavouriteClick} disabled={loading}>
          {isFavourite ? (
            <FavoriteIcon style={{ color: '#e91e63' }} />
          ) : (
            <FavoriteBorderIcon />
          )}
        </Favorite>
        <CardImage src={posterLink} />
        <ImageOverlay>
          <ViewDetailsText>View Details</ViewDetailsText>
        </ImageOverlay>
      </Top>
      <CardInformation>
        <Title>{title}</Title>
        <Description>{desc}</Description>
        <IdmbRating>
          <StarIcon2 src={StarImage} />
          <Rating>{rating}</Rating>
        </IdmbRating>
      </CardInformation>
    </Card>
  );
};

export default MovieCard;
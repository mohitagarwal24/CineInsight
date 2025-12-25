import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import MovieCard from '../components/MovieCard';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const Container = styled.div`
padding: 20px 30px;
padding-bottom: 200px;
height: 100%;
overflow-y: scroll;
display: flex;
flex-direction: column;
gap: 20px;
`
const Topic = styled.div`
  color: ${({ theme }) => theme.text_primary};
  font-size: 24px;
  font-weight: 540;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FavouritesContainer = styled.div`
display: flex;
flex-wrap: wrap;
gap: 14px;
padding: 18px 6px;
@media (max-width: 550px){
  justify-content: center;
}
`

const Loader = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 100%;
width: 100%;
`

const DisplayNo = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
height: 100%;
width: 100%;
color: ${({ theme }) => theme.text_primary};
gap: 16px;
`

const EmptyText = styled.div`
  font-size: 18px;
  color: ${({ theme }) => theme.text_secondary};
  text-align: center;
`

const EmptyIcon = styled.div`
  font-size: 64px;
  opacity: 0.5;
`


const Favourites = () => {
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchFavourites = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const favsCollectionRef = collection(db, "Users", user.uid, "Favourites");
        const favsSnapshot = await getDocs(favsCollectionRef);
        
        const favsData = favsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        
        setFavourites(favsData);
      } catch (error) {
        console.error("Error fetching favourites:", error);
      }
      setLoading(false);
    };

    fetchFavourites();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <Container>
        <Topic>Favourites</Topic>
        <Loader>
          <CircularProgress />
        </Loader>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container>
        <Topic>Favourites</Topic>
        <DisplayNo>
          <EmptyIcon>🔐</EmptyIcon>
          <EmptyText>Please sign in to view your favourites</EmptyText>
        </DisplayNo>
      </Container>
    );
  }

  if (favourites.length === 0) {
    return (
      <Container>
        <Topic>Favourites</Topic>
        <DisplayNo>
          <EmptyIcon>💔</EmptyIcon>
          <EmptyText>
            No favourites yet!<br />
            Click the heart icon on any movie to add it here.
          </EmptyText>
        </DisplayNo>
      </Container>
    );
  }
  
  return (
    <Container>
      <Topic>
        Favourites ({favourites.length})
      </Topic>
      <FavouritesContainer>
        {favourites.map((fav) => (
          <MovieCard
            key={fav.id}
            posterLink={fav.posterLink}
            title={fav.title}
            desc={fav.desc}
            rating={fav.rating}
            id={fav.movieId}
          />
        ))}
      </FavouritesContainer>
    </Container>
  )
}

export default Favourites
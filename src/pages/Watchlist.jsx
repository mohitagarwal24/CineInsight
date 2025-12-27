import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { CircularProgress, Tabs, Tab, IconButton } from '@mui/material';
import MovieCard from '../components/MovieCard';
import { db } from '../firebase';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const Container = styled.div`
  padding: 20px 30px;
  padding-bottom: 200px;
  height: 100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Topic = styled.div`
  color: ${({ theme }) => theme.text_primary};
  font-size: 24px;
  font-weight: 540;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const WatchlistContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  padding: 18px 6px;
  @media (max-width: 550px) {
    justify-content: center;
  }
`;

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const DisplayNo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  color: ${({ theme }) => theme.text_primary};
  gap: 16px;
`;

const EmptyText = styled.div`
  font-size: 18px;
  color: ${({ theme }) => theme.text_secondary};
  text-align: center;
`;

const EmptyIcon = styled.div`
  font-size: 64px;
  opacity: 0.5;
`;

const StyledTabs = styled(Tabs)`
  .MuiTabs-indicator {
    background-color: ${({ theme }) => theme.primary};
  }
`;

const StyledTab = styled(Tab)`
  color: ${({ theme }) => theme.text_secondary} !important;
  text-transform: none !important;
  font-weight: 500 !important;
  
  &.Mui-selected {
    color: ${({ theme }) => theme.primary} !important;
  }
`;

const MovieCardWrapper = styled.div`
  position: relative;
`;

const StatusOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.9), transparent);
  padding: 12px 8px 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 0 0 6px 6px;
  z-index: 5;
`;

const StatusBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  color: ${({ watched }) => watched ? '#4caf50' : '#ffc107'};
  font-weight: 500;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 4px;
`;

const ActionButton = styled(IconButton)`
  padding: 4px !important;
  color: ${({ theme }) => theme.text_secondary} !important;
  
  &:hover {
    color: ${({ color }) => color} !important;
    background: rgba(255,255,255,0.1) !important;
  }
`;

const StatsBar = styled.div`
  display: flex;
  gap: 24px;
  padding: 16px 20px;
  background: ${({ theme }) => theme.bg};
  border-radius: 12px;
  margin-bottom: 10px;
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const StatValue = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
`;

const StatLabel = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.text_secondary};
`;

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchWatchlist = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const watchlistRef = collection(db, "Users", user.uid, "Watchlist");
        const watchlistSnapshot = await getDocs(watchlistRef);
        
        const watchlistData = watchlistSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        
        setWatchlist(watchlistData);
      } catch (error) {
        console.error("Error fetching watchlist:", error);
      }
      setLoading(false);
    };

    fetchWatchlist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleToggleWatched = async (movieId, currentStatus) => {
    if (!user) return;
    
    try {
      const docRef = doc(db, "Users", user.uid, "Watchlist", movieId);
      await updateDoc(docRef, { watched: !currentStatus });
      
      setWatchlist(prev => 
        prev.map(item => 
          item.id === movieId ? { ...item, watched: !currentStatus } : item
        )
      );
    } catch (error) {
      console.error("Error updating watched status:", error);
    }
  };

  const handleRemoveFromWatchlist = async (movieId) => {
    if (!user) return;
    
    try {
      const docRef = doc(db, "Users", user.uid, "Watchlist", movieId);
      await deleteDoc(docRef);
      
      setWatchlist(prev => prev.filter(item => item.id !== movieId));
    } catch (error) {
      console.error("Error removing from watchlist:", error);
    }
  };

  const filteredWatchlist = watchlist.filter(item => {
    if (tabValue === 0) return true;
    if (tabValue === 1) return !item.watched;
    if (tabValue === 2) return item.watched;
    return true;
  });

  const watchedCount = watchlist.filter(item => item.watched).length;
  const toWatchCount = watchlist.filter(item => !item.watched).length;

  if (loading) {
    return (
      <Container>
        <Topic>Watchlist</Topic>
        <Loader>
          <CircularProgress />
        </Loader>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container>
        <Topic>Watchlist</Topic>
        <DisplayNo>
          <EmptyIcon>🔐</EmptyIcon>
          <EmptyText>Please sign in to view your watchlist</EmptyText>
        </DisplayNo>
      </Container>
    );
  }

  return (
    <Container>
      <Topic>Watchlist</Topic>
      
      {watchlist.length > 0 && (
        <StatsBar>
          <StatItem>
            <StatValue>{watchlist.length}</StatValue>
            <StatLabel>Total Movies</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue>{toWatchCount}</StatValue>
            <StatLabel>To Watch</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue>{watchedCount}</StatValue>
            <StatLabel>Watched</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue>
              {watchlist.length > 0 ? Math.round((watchedCount / watchlist.length) * 100) : 0}%
            </StatValue>
            <StatLabel>Completed</StatLabel>
          </StatItem>
        </StatsBar>
      )}
      
      <StyledTabs value={tabValue} onChange={(e, v) => setTabValue(v)}>
        <StyledTab label={`All (${watchlist.length})`} />
        <StyledTab label={`To Watch (${toWatchCount})`} />
        <StyledTab label={`Watched (${watchedCount})`} />
      </StyledTabs>

      {filteredWatchlist.length === 0 ? (
        <DisplayNo>
          <EmptyIcon>{tabValue === 2 ? '🎬' : '📋'}</EmptyIcon>
          <EmptyText>
            {tabValue === 0 && (
              <>
                Your watchlist is empty!<br />
                Add movies using the bookmark icon.
              </>
            )}
            {tabValue === 1 && "All movies have been watched!"}
            {tabValue === 2 && "No watched movies yet. Start watching!"}
          </EmptyText>
        </DisplayNo>
      ) : (
        <WatchlistContainer>
          {filteredWatchlist.map((item) => (
            <MovieCardWrapper key={item.id}>
              <MovieCard
                posterLink={item.posterLink}
                title={item.title}
                desc={item.desc}
                rating={item.rating}
                id={item.movieId}
              />
              <StatusOverlay>
                <StatusBadge watched={item.watched}>
                  {item.watched ? (
                    <>
                      <CheckCircleIcon sx={{ fontSize: 14 }} />
                      Watched
                    </>
                  ) : (
                    <>
                      <AccessTimeIcon sx={{ fontSize: 14 }} />
                      To Watch
                    </>
                  )}
                </StatusBadge>
                <ActionButtons>
                  <ActionButton 
                    onClick={() => handleToggleWatched(item.id, item.watched)}
                    color="#4caf50"
                    title={item.watched ? "Mark as unwatched" : "Mark as watched"}
                  >
                    <CheckCircleIcon sx={{ fontSize: 18 }} />
                  </ActionButton>
                  <ActionButton 
                    onClick={() => handleRemoveFromWatchlist(item.id)}
                    color="#f44336"
                    title="Remove from watchlist"
                  >
                    <DeleteOutlineIcon sx={{ fontSize: 18 }} />
                  </ActionButton>
                </ActionButtons>
              </StatusOverlay>
            </MovieCardWrapper>
          ))}
        </WatchlistContainer>
      )}
    </Container>
  );
};

export default Watchlist;

import React from 'react';
import styled from 'styled-components';
import { Avatar, Button } from '@mui/material';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';

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
`;

const ProfileCard = styled.div`
  background: ${({ theme }) => theme.bg};
  border-radius: 16px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  max-width: 500px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const UserAvatar = styled(Avatar)`
  width: 120px !important;
  height: 120px !important;
  border: 4px solid ${({ theme }) => theme.primary};
  box-shadow: 0 4px 20px rgba(190, 26, 219, 0.3);
`;

const UserName = styled.div`
  font-size: 28px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: ${({ theme }) => theme.bgLight};
  border-radius: 12px;
  color: ${({ theme }) => theme.text_secondary};
`;

const InfoLabel = styled.span`
  color: ${({ theme }) => theme.text_secondary};
  font-size: 14px;
`;

const InfoValue = styled.span`
  color: ${({ theme }) => theme.text_primary};
  font-size: 14px;
  font-weight: 500;
`;

const LogoutButton = styled(Button)`
  margin-top: 16px !important;
  background: linear-gradient(135deg, #be1adb 0%, #9c27b0 100%) !important;
  color: white !important;
  padding: 12px 32px !important;
  border-radius: 12px !important;
  text-transform: none !important;
  font-weight: 600 !important;
  gap: 8px !important;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(190, 26, 219, 0.4);
  }
  transition: all 0.2s ease-in-out !important;
`;

const NotLoggedIn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 60vh;
  gap: 16px;
  color: ${({ theme }) => theme.text_secondary};
`;

const EmptyIcon = styled.div`
  font-size: 64px;
  opacity: 0.5;
`;

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/');
      window.location.reload();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (!user) {
    return (
      <Container>
        <Topic>Profile</Topic>
        <NotLoggedIn>
          <EmptyIcon>👤</EmptyIcon>
          <div>Please sign in to view your profile</div>
        </NotLoggedIn>
      </Container>
    );
  }

  return (
    <Container>
      <Topic>Profile</Topic>
      <ProfileCard>
        <UserAvatar src={user.photoURL} alt={user.displayName}>
          {!user.photoURL && user.displayName?.[0]}
        </UserAvatar>
        
        <UserName>{user.displayName || 'User'}</UserName>
        
        <InfoSection>
          <InfoRow>
            <PersonIcon />
            <InfoLabel>Name:</InfoLabel>
            <InfoValue>{user.displayName || 'Not set'}</InfoValue>
          </InfoRow>
          
          <InfoRow>
            <EmailIcon />
            <InfoLabel>Email:</InfoLabel>
            <InfoValue>{user.email || 'Not available'}</InfoValue>
          </InfoRow>
        </InfoSection>
        
        <LogoutButton onClick={handleLogout} variant="contained">
          <LogoutIcon />
          Sign Out
        </LogoutButton>
      </ProfileCard>
    </Container>
  );
};

export default Profile;
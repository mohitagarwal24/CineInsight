import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Menu, PersonRounded } from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";

const NavBarDiv = styled.div`
display: flex;
justify-content: space-between;
padding: 16px 40px;
align-items: center;
color: ${({ theme }) => theme.text_primary};
gap: 30px;
background: ${({ theme }) => theme.bgLight}
border-radius: 16px;
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
backdrop-filter: blur(5.7px);
-webkit-backdrop-filter: blur(5.7px);
@media (max-width: 768px) {
  padding: 16px;
`;

const ButtonDiv = styled.div`
  font-size: 14px;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.primary};
  border: 1px solid ${({ theme }) => theme.primary};
  border-radius: 12px;
  width: 100%;
  max-width: 70px;
  padding: 8px 10px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  &:hover {
    background-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.text_primary};
  }
`;

const IcoButton = styled(IconButton)`
  color: ${({ theme }) => theme.text_secondary} !important;
`;

const Welcome = styled.div`
  font-size: 26px;
  font-weight: 600;
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const NavBar = ({
  setMenuOpen,
  menuOpen,
  setSignInOpen,
  SignInOpen,
  loggedIn,
  CurrentUser,
}) => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <NavBarDiv>
      <IcoButton onClick={() => setMenuOpen(!menuOpen)}>
        <Menu />
      </IcoButton>
      {user ? <Welcome>Welcome, {user.displayName}</Welcome> : <>&nbsp;</>}
      {user ? (
        <Link to="/profile" style={{ textDecoration: "none" }}>
          <Avatar src={user.photoURL} />
        </Link>
      ) : (
        <ButtonDiv onClick={() => setSignInOpen(true)}>
          <PersonRounded />
          Login
        </ButtonDiv>
      )}
    </NavBarDiv>
  );
};

export default NavBar;

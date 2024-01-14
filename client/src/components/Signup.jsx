import {
  CloseRounded,
  EmailRounded,
  PasswordRounded,
  Person,
  Visibility,
  VisibilityOff,
  TroubleshootRounded,
} from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useTheme } from "styled-components";
import GoogleLogo from "../images/google.webp";
import { IconButton, Modal } from "@mui/material";
import { auth, googleAuthProvider } from "../firebase";
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000000a7;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 380px;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text_secondary};
  padding: 10px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Title = styled.div`
  font-size: 22px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
  margin: 16px 28px;
`;
const OutlinedBox = styled.div`
  height: 44px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  color: ${({ theme }) => theme.text_secondary};
  ${({ googleButton, theme }) =>
    googleButton &&
    `
    user-select: none; 
  gap: 16px;`}
  ${({ button, theme }) =>
    button &&
    `
    user-select: none; 
  border: none;
    background: ${theme.button};
    color: '${theme.text_secondary}';`}
    ${({ activeButton, theme }) =>
    activeButton &&
    `
    user-select: none; 
  border: none;
    background: ${theme.primary};
    color: white;`}
  margin: 3px 20px;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  padding: 0px 14px;
`;
const GoogleIcon = styled.img`
  width: 22px;
`;
const Divider = styled.div`
  display: flex;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.text_secondary};
  font-size: 14px;
  font-weight: 600;
`;
const Line = styled.div`
  width: 80px;
  height: 1px;
  border-radius: 10px;
  margin: 0px 10px;
  background-color: ${({ theme }) => theme.text_secondary};
`;

const TextInput = styled.input`
  width: 100%;
  border: none;
  font-size: 14px;
  border-radius: 3px;
  background-color: transparent;
  outline: none;
  color: ${({ theme }) => theme.text_secondary};
`;

const LoginText = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary};
  margin: 20px 20px 38px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Span = styled.span`
  color: ${({ theme }) => theme.primary};
`;

const Error = styled.div`
  color: red;
  font-size: 10px;
  margin: 2px 26px 8px 26px;
  display: block;
  ${({ error, theme }) =>
    error === "" &&
    `    display: none;
    `}
`;

const SignUp = ({ SignUpOpen, setSignUpOpen, setSignInOpen }) => {
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      console.log(result);
      localStorage.setItem("token", result.user.accesstoken);
      localStorage.setItem("user", JSON.stringify(result.user));
      setSignUpOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSignUp = async () => {
    try {
      setSignUpOpen(false);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredential);
      const user = userCredential.user;
      await updateProfile(user, {
        displayName: username,
      });
      console.log(user);
      localStorage.setItem("token", user.accesstoken);
      localStorage.setItem("user", JSON.stringify(user));
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal open={SignUpOpen} onClose={() => setSignUpOpen(false)}>
      <Container>
        <Wrapper>
          <CloseRounded
            style={{
              position: "absolute",
              top: "24px",
              right: "30px",
              cursor: "pointer",
              color: "inherit",
            }}
            onClick={() => setSignUpOpen(false)}
          />
          <>
            <Title>Sign Up</Title>
            <OutlinedBox
              googleButton={TroubleshootRounded}
              style={{ margin: "24px" }}
              onClick={signInWithGoogle}
            >
              <>
                <GoogleIcon src={GoogleLogo} />
                Sign In with Google
              </>
            </OutlinedBox>
            <Divider>
              <Line />
              or
              <Line />
            </Divider>
            <OutlinedBox style={{ marginTop: "24px" }}>
              <Person
                sx={{ fontSize: "20px" }}
                style={{ paddingRight: "12px" }}
              />
              <TextInput
                placeholder="Full Name"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </OutlinedBox>
            <OutlinedBox>
              <EmailRounded
                sx={{ fontSize: "20px" }}
                style={{ paddingRight: "12px" }}
              />
              <TextInput
                required
                placeholder="Email Id"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </OutlinedBox>

            <OutlinedBox>
              <PasswordRounded
                sx={{ fontSize: "20px" }}
                style={{ paddingRight: "12px" }}
              />
              <TextInput
                required
                placeholder="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <IconButton color="inherit"></IconButton>
            </OutlinedBox>

            <OutlinedBox 
            button={true} 
            style={{ marginTop: "6px", backgroundColor: "#be1adb", color: "white" }}
            onClick={handleSignUp}
            >
              Create Account
            </OutlinedBox>
          </>
          <LoginText>
            Already have an account ?
            <Span
              onClick={() => {
                setSignUpOpen(false);
                setSignInOpen(true);
              }}
              style={{
                fontWeight: "500",
                marginLeft: "6px",
                cursor: "pointer",
              }}
            >
              Sign In
            </Span>
          </LoginText>
        </Wrapper>
      </Container>
    </Modal>
  );
};

export default SignUp;

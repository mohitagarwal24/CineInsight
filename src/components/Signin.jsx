import {
  CloseRounded,
  EmailRounded,
  PasswordRounded,
  Person,
  Visibility,
  VisibilityOff,
  TroubleshootRounded,
} from "@mui/icons-material";
import React, { useState } from "react";
import styled from "styled-components";
import { IconButton, Modal } from "@mui/material";
import GoogleLogo from "../images/google.webp";
import {
  signInWithRedirect,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, googleAuthProvider } from "../firebase";

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
  color: ${({ theme }) => theme.text_primary};
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
    color:'${theme.bg}';`}
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
  margin: 20px 20px 30px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Span = styled.span`
  color: ${({ theme }) => theme.primary};
`;

const ForgetPassword = styled.div`
  color: ${({ theme }) => theme.text_secondary};
  font-size: 13px;
  margin: 8px 26px;
  display: block;
  cursor: pointer;
  text-align: right;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const Signin = ({
  SignInOpen,
  setSignInOpen,
  SignUpOpen,
  setSignUpOpen,
  loggedIn,
  setLoggedIn,
  CurrentUser,
  setCurrentUser,
}) => {
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      console.log(result);
      localStorage.setItem("token", result.user.accesstoken);
      localStorage.setItem("user", JSON.stringify(result.user));
      setSignInOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    try {
      setSignInOpen(false);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredential);
      const user = userCredential.user;
      localStorage.setItem("token", user.accesstoken);
      localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      console.error(error);
    }

    window.location.reload();
  };

  return (
    <Modal open={SignInOpen} onClose={() => setSignInOpen(false)}>
      <Container>
        <Wrapper>
          <CloseRounded
            style={{
              position: "absolute",
              top: "24px",
              right: "30px",
              cursor: "pointer",
            }}
            onClick={() => setSignInOpen(false)}
          />
          <>
            <Title>Sign In</Title>
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
              <EmailRounded
                sx={{ fontSize: "20px" }}
                style={{ paddingRight: "12px" }}
              />
              <TextInput
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
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <IconButton color="inherit"></IconButton>
            </OutlinedBox>

            <ForgetPassword>
              <b>Forgot password ?</b>
            </ForgetPassword>
            <OutlinedBox
              button={true}
              style={{
                marginTop: "6px",
                marginBottom: "24px",
                backgroundColor: "#be1adb",
                color: "white",
              }}
              onClick={handleSignIn}
            >
              Submit
            </OutlinedBox>
          </>
          <LoginText>
            Don't have an account ?
            <Span
              style={{
                fontWeight: "500",
                marginLeft: "6px",
                cursor: "pointer",
              }}
              onClick={() => {
                setSignUpOpen(true);
                setSignInOpen(false);
              }}
            >
              Create Account
            </Span>
          </LoginText>
        </Wrapper>
      </Container>
    </Modal>
  );
};

export default Signin;

import React from "react";
import styled from "styled-components";
import { Avatar, Box, Rating, Typography } from "@mui/material";

const Container = styled.div`
  background-color: ${({ theme }) => theme.bg};
  border-radius: 10px;
  padding: 10px;
  display: flex;
  flex-direction: row;
  padding: 20px;
  gap: 10px;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text_secondary};
  font-size: 14px;
`;

const Text = styled.div`
  color: ${({ theme }) => theme.text_secondary};
`;

function ReviewBox({ userComment, userName, starsGiven, avatarURL }) {
  return (
    <Container>
      <Avatar src={avatarURL} />
      <UserInfo userName={userName} starsGiven={starsGiven}>
        <Box
          sx={{
            "& > legend": { mt: 0 },
          }}
        >
          <Typography component="legend">
            <Text>{userName}</Text>
          </Typography>
          <Rating name="read-only" value={parseInt(starsGiven, 10)} readOnly />
        </Box>
        {userComment}
      </UserInfo>
    </Container>
  );
}

export default ReviewBox;

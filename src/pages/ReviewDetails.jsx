import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SendIcon from "@mui/icons-material/Send";
import { CircularProgress, IconButton } from "@mui/material";
import StarImage from "../images/star image.jpg";
import { useParams } from "react-router-dom";
import ReviewBox from "../components/ReviewBox";
import Avatar from "@mui/material/Avatar";
import { format } from "timeago.js";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import { Send } from "@mui/icons-material";
import { db } from "../firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";

const Container = styled.div`
  padding: 20px 30px;
  padding-bottom: 200px;
  height: 100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Top = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Image = styled.img`
  width: 250px;
  height: 250px;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.text_secondary};
  object-fit: cover;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

const Title = styled.div`
  font-size: 32px;
  font-weight: 800;
  color: ${({ theme }) => theme.text_primary};
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Description = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary};
`;

const Tags = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  flex-wrap: wrap;
`;

const Tag = styled.div`
  background-color: ${({ theme }) => theme.text_secondary + 50};
  color: ${({ theme }) => theme.text_primary};
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
`;

const Reviews = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const WriteReview = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 6;
`;

const UserReviews = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const UserName = styled.div`
  margin-left: 5px;
  font-size: 14px;
  color: ${({ theme }) => theme.text_primary};
`;

const MyRating = styled.div``;

const MyReview = styled.div`
  display: flex;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  border-radius: 8px;
  cursor: pointer;
  padding: 12px 16px;
  justify-content: flex-start;
  align-items: center;
  gap: 6px;
  color: ${({ theme }) => theme.text_secondary};
`;

const Topic = styled.div`
  color: ${({ theme }) => theme.primary};
  margin-top: 10px;
  font-size: 22px;
  font-weight: 540;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const EpisodeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Favorite = styled(IconButton)`
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.text_secondary + 95} !important;
  color: ${({ theme }) => theme.text_primary} !important;
`;

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;
const Creator = styled.div`
  color: ${({ theme }) => theme.text_secondary};
  font-size: 12px;
`;
const CreatorContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const CreatorDetails = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;
const Views = styled.div`
  color: ${({ theme }) => theme.text_secondary};
  font-size: 12px;
  margin-left: 20px;
`;
const Icon = styled.div`
  color: white;
  font-size: 12px;
  margin-left: 20px;
  border-radius: 50%;
  background: #9000ff !important;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
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
const RatingPoints = styled.div`
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

const Runtime = styled.div`
  color: ${({ theme }) => theme.text_secondary};
  font-size: 12px;
  margin-left: 20px;
  margin-top: 10px;
`;

const Platform = styled.div`
  color: ${({ theme }) => theme.text_secondary};
  font-size: 12px;
  margin-left: 20px;
  margin-top: 10px;
`;

const WatchTrailerButton = styled.a`
  font-size: 12px;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.text_primary};
  border: 1px solid ${({ theme }) => theme.text_primary};
  border-radius: 30px;
  padding: 8px 10px;
  text-align: center;
  margin-top: 10px;
  margin-left: 20px;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: ${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.text_primary};
  }
`;

const Text = styled.div`
  color: ${({ theme }) => theme.text_secondary};
`;

const ReviewDetails = ({ setSignInOpen }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [comment, setComment] = useState("");
  const [stars, setStars] = useState("");

  const [value, setValue] = React.useState(0);
  const { id } = useParams();
  const [movieData, setMovieData] = useState(null);
  const [reviews, setReviews] = useState([]);
  // console.log(id)
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviewsCollectionRef = collection(db, "Movies", id, "Reviews");
        const reviewsSnapshot = await getDocs(reviewsCollectionRef);

        if (!reviewsSnapshot.empty) {
          const reviewsData = reviewsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setReviews(reviewsData);
        } else {
          console.log("No reviews found for this movie.");
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [id]);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const movieDocRef = doc(db, "Movies", id); 
        const movieDocSnapshot = await getDoc(movieDocRef);

        if (movieDocSnapshot.exists()) {
          const data = { ...movieDocSnapshot.data(), id: movieDocSnapshot.id };
          setMovieData(data);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    fetchMovieData();
  }, [id]);

  const handleYoutubeTrailer = () => {
    window.location.href = movieData.Trailer;
  };

  // console.log(reviews)

  if (!movieData) {
    return <p>Loading...</p>;
  }

  const handleReviewUpload = async () => {
    if (user) {
      try {
        const movieId = id; 

        const reviewData = {
          UserComment: comment,
          UserName: user.displayName,
          StarsGiven: parseInt(stars, 10),
          PhotoURL: (user.photoURL) ? (user.photoURL):(" https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg"),
        };

        const reviewsCollectionRef = collection(
          db,
          "Movies",
          movieId,
          "Reviews"
        );
        await addDoc(reviewsCollectionRef, reviewData);
        console.log("Review uploaded successfully!");

      } catch (error) {
        console.error("Error uploading review:", error);
      }

      window.location.reload();
    } else {
      setSignInOpen(true);
    }
  };

  return (
    <Container>
      <>
        <Top>
          <Image src={movieData.PosterLink} />
          <Details>
            <Title>{movieData.Title}</Title>
            <Description>{movieData.Description}</Description>
            <Tags>
              {movieData.Genre && movieData.Genre.map((genre, index) => (
                <Tag key={index}>{genre}</Tag>
              ))}
            </Tags>
            <CreatorContainer>
              <IdmbRating>
                <StarIcon src={StarImage} />
                <RatingPoints> {movieData.Rating}</RatingPoints>
              </IdmbRating>
              <Runtime>• {movieData.Runtime}</Runtime>
              <Platform>• {movieData.Platform}</Platform>
              <WatchTrailerButton onClick={handleYoutubeTrailer}>
                ▶ Watch Trailer
              </WatchTrailerButton>
            </CreatorContainer>
          </Details>
        </Top>
        <Reviews>
          <Topic>Reviews</Topic>
          <WriteReview>
            {user ? <Avatar src={user.photoURL}></Avatar> : <Avatar />}
            <UserInfo>
              <UserName>{user ? user.displayName : "Anonymous User"}</UserName>
              <MyRating>
                <Box
                  sx={{
                    "& > legend": { mt: 0 },
                  }}
                >
                  <Typography component="legend"></Typography>
                  <Rating
                    name="simple-controlled"
                    value={parseInt(stars,10)}
                    onChange={(e) => setStars(e.target.value)}
                  />
                </Box>
              </MyRating>
              <MyReview>
                <input
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Write Your Review"
                  style={{
                    border: "none",
                    outline: "none",
                    width: "100%",
                    background: "inherit",
                    color: "inherit",
                  }}
                />
                <SendIcon onClick={handleReviewUpload} />
              </MyReview>
            </UserInfo>
          </WriteReview>
          <UserReviews>
            {reviews.map((review) => (
              <div key={review.id}>
                <ReviewBox
                  userComment={review.UserComment}
                  userName={review.UserName}
                  avatarURL={review.PhotoURL}
                  starsGiven={review.StarsGiven}
                />
              </div>
            ))}
          </UserReviews>
        </Reviews>
      </>
    </Container>
  );
};

export default ReviewDetails;

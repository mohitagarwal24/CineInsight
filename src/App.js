import { useState, useEffect, useRef } from "react";
import styled, { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./utils/Themes";
import Sidebar from "./components/Sidebar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Dashboard from "./pages/Dashboard.jsx";
import Search from "./pages/Search.jsx";
import Favourites from "./pages/Favourites.jsx";
import Watchlist from "./pages/Watchlist.jsx";
import Profile from "./pages/Profile.jsx";
import ReviewDetails from "./pages/ReviewDetails.jsx";
import Signin from "./components/Signin.jsx";
import SignUp from "./components/Signup.jsx";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase.js";
import DisplayMovies from "./pages/DisplayMovies.jsx";



const Container = styled.div`
  display: flex;
  background: ${({ theme }) => theme.bgLight};
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: hidden;
`;

const Frame = styled.div`
  display: flex;
  flex-direction: column;
  flex: 3;
`;

function App() {
  //hooks
  const [darkMode, setDarkMode] = useState(true);
  const [menuOpen, setMenuOpen] = useState(true);
  const [SignInOpen, setSignInOpen] = useState(false);
  const [SignUpOpen, setSignUpOpen] = useState(false);
  const [movies, setMovies] = useState([]);
  const moviesCollectionRef = useRef(collection(db, "Movies"));

  useEffect(() => {
    const getMovies = async () => {
      try {
        const data = await getDocs(moviesCollectionRef.current);
        const movieData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setMovies(movieData);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    getMovies();
  }, []);



  // console.log(movies);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <BrowserRouter>
        {SignInOpen && (<Signin SignInOpen={SignInOpen} setSignInOpen={setSignInOpen} setSignUpOpen={setSignUpOpen} />)}

        {SignUpOpen && (<SignUp SignUpOpen={SignUpOpen} setSignUpOpen={setSignUpOpen} setSignInOpen={setSignInOpen} />)}

        <Container>
          {menuOpen && (
            <Sidebar menuOpen={menuOpen} setMenuOpen={setMenuOpen} setDarkMode={setDarkMode} darkMode={darkMode} />
          )}
          <Frame>
            <NavBar menuOpen={menuOpen} setMenuOpen={setMenuOpen} SignInOpen={SignInOpen} setSignInOpen={setSignInOpen} />

            <Routes>
              <Route path="/" exact element={<Dashboard movies={movies} />} />
              <Route path="/search" exact element={<Search movies={movies} />} />
              <Route path="/favourites" exact element={<Favourites />} />
              <Route path="/watchlist" exact element={<Watchlist />} />
              <Route path="/profile" exact element={<Profile />} />
              <Route path="/movie/:id" exact element={<ReviewDetails setSignInOpen={setSignInOpen} />} />
              <Route path="/showmovies/:genre" exact element={<DisplayMovies movies={movies} />} />
            </Routes>
          </Frame>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

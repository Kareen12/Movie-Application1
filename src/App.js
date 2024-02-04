import React, { useState } from "react";
import Axios from "axios";
import styled from "styled-components";
import MovieComponent from "./components/MovieComponent";
import MovieInfoComponent from "./components/MovieInfoComponent";

export const API_KEY = "d148557";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const HomeCont = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;

  @media (min-width: 768px) {
    /* Adjust styles for larger screens */
    padding: 20px;
  }
`;
const Header = styled.div`
  background-color: black;
  color: white;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
  position:sticky;
  top: 0;
  z-index: 100;

  @media (max-width: 768px) {
    /* Adjust styles for smaller screens */
    font-size: 20px;
    padding: 10px 5px;
  }

`;
const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  border-radius: 6px;
  margin-left: 20px;
  width: 50%;
  background-color: white;
  cursor:pointer;
`;
const SearchIcon = styled.img`
  width: 32px;
  height: 32px;
`;
const MovieImage = styled.img`
  width: 48px;
  height: 48px;
  margin: 15px;
  cursor:pointer;
`;
const SearchInput = styled.input`
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 15px;
  cursor:arrow;

`;
const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 25px;
  justify-content: space-evenly;;
`;
// const Placeholder = styled.img`
//   width: 120px;
//   height: 120px;
//   margin: 150px;
//   opacity: 50%;
// `;

// const Placeholder = styled.img`
//   width: 120px;
//   height: 120px;
//   margin: 50px;
//   opacity: 50%;
// `;

const Image = styled.img`
  max-width: 80%;
  height: auto;
  margin-bottom: 20px; 
  cursor:pointer;
`;

const Text1 = styled.p`
  font-size: 24px;
  color: #333;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const Text2 = styled.p`
  font-size: 20px;
  color: #666; 

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

function App() {
  const [searchQuery, updateSearchQuery] = useState("");

  const [movieList, updateMovieList] = useState([]);
  const [selectedMovie, onMovieSelect] = useState();

  const [timeoutId, updateTimeoutId] = useState();

  const fetchData = async (searchString) => {
    const response = await Axios.get(
      `https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`,
    );
    updateMovieList(response.data.Search);
  };

  const onTextChange = (e) => {
    onMovieSelect("")
    clearTimeout(timeoutId);
    updateSearchQuery(e.target.value);
    const timeout = setTimeout(() => fetchData(e.target.value), 500);
    updateTimeoutId(timeout);
  };
  return (
    <Container>
      <Header>
        <AppName>
          <MovieImage src="/images/movie-safari-img1.jpg" />
          Movie Safari
        </AppName>
        <SearchBox>
          <SearchIcon src="/images/movie-safari-search-icon.svg" />
          <SearchInput
            placeholder="Search Movie"
            value={searchQuery}
            onChange={onTextChange}
          />
        </SearchBox>
      </Header>
      {selectedMovie && <MovieInfoComponent selectedMovie={selectedMovie} onMovieSelect={onMovieSelect}/>}
      <MovieListContainer>
        {movieList?.length ? (
          movieList.map((movie, index) => (
            <MovieComponent
              key={index}
              movie={movie}
              onMovieSelect={onMovieSelect}
            />
          ))
        ) : (
          <HomeCont>
          <Image src="/images/movie-safari-img1.jpg" alt="Movie Safari Image" />
          <Text1>Welcome to Movie Safari</Text1>
          <Text2>Search for your favourite movies Now!</Text2>
          </HomeCont>
          
        )}
      </MovieListContainer>
    </Container>
  );
}

export default App;

import React, { useState, useEffect } from "react";

import MovieViewCard from "./components/MovieViewCard";
import SearchIcon from "./search.svg";
import "./App.css";

const DB_KEY = process.env.REACT_APP_DB_KEY
const BD_URL = `http://www.omdbapi.com?apikey=${DB_KEY}`;

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    searchMovies("spider man");
  }, []);

  const searchMovies = async (title) => {
    const response = await fetch(`${BD_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };

  return (
    <div className="app">
      <h1>MovieView</h1>

      <div className="search">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for movies"
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieViewCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
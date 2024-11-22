import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import Card from "../../components/card/card";
import { image_API } from "../../api/apiConfig";
import movieApi from "../../api/movieApi";
import "./search.css";
import Header from "../../components-main/header/Header";
const Search = () => {
  const { searchTerm } = useParams();
  let movieList = [];
  const location = useLocation();
  const [movies, setMovies] = useState([]);
  const [searchMode, setSearchMode] = useState(""); // "name" or "genre"

  useEffect(() => {
    const handleSearch = async () => {
      try {
        if (searchMode === "name") {
          const response = await movieApi.searchMovie(searchTerm);
          if (response && response.data && response.data.content) {
            setMovies(response.data.content);
          }
        } else if (searchMode === "genre") {
          const queryParams = new URLSearchParams(location.search);
          const genres = queryParams.get("genres").split("-");
          console.log("genres", genres);
          const requests = genres.map((genre) =>
            movieApi.getMoviesByCategory(genre)
          );
          const responses = await Promise.all(requests);
          const allMovies = responses.flatMap(
            (response) => response.data.content
          );

          // Use a Set to remove duplicates
          const uniqueMovies = Array.from(
            new Set(allMovies.map((movie) => movie.id))
          ).map((id) => allMovies.find((movie) => movie.id === id));

          setMovies(uniqueMovies);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    handleSearch();
  }, [searchTerm, location.search, searchMode]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    console.log("queryParams", queryParams);
    if (queryParams.get("genres")) {
      setSearchMode("genre");
    } else {
      setSearchMode("name");
    }
  }, [location.search]);

  return (
    <div>
      <Header></Header>
      <div></div>
      <div className="movieList">
        <div className="row">
          {movies.map((movie) => (
            <Card
              key={movie.id}
              id={movie.id}
              title={movie.title}
              rating={movie.ratingCount}
              views={movie.view}
              thumbnail={image_API.w500Image(movie.poster_path)}
              className="card"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;

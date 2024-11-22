import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import MovieCard from "../../components-main/movie-card/MovieCard";
import { image_API } from "../../api/apiConfig";
import movieApi from "../../api/movieApi";
import "./search.css";
import Header from "../../components-main/header/Header";
const Search = () => {
  const { searchTerm } = useParams();
  const location = useLocation();
  const [searchMode, setSearchMode] = useState("name");
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const genreQueryParam = queryParams.get("genres");
    const movieNameQueryParam = queryParams.get("movieName");

    if (genreQueryParam) {
      setSearchMode("genre");
      setQuery(genreQueryParam);
    } else if (movieNameQueryParam) {
      setSearchMode("name");
      setQuery(movieNameQueryParam);
    }
  }, [location.search]);

  useEffect(() => {
    const handleSearch = async () => {
      try {
        const queryParams = new URLSearchParams(location.search);
        const genreQueryParam = queryParams.get("genres");
        const movieNameQueryParam = queryParams.get("movieName");
        let allMovies = [];

        if (searchMode === "genre" && genreQueryParam) {
          const genres = genreQueryParam.split("-");
          console.log(genres);
          const requests = genres.map((genre) =>
            movieApi.getMoviesByCategory(genre)
          );
          const responses = await Promise.all(requests);
          allMovies = responses.flatMap((response) => response.data.content);
          if (genres.length > 1) {
            const movieCountMap = new Map();
            allMovies.forEach((movie) => {
              movieCountMap.set(
                movie.id,
                (movieCountMap.get(movie.id) || 0) + 1
              );
            });

            // Filter movies that appear more than once in each genre
            const intersectionMovies = allMovies.filter(
              (movie) => movieCountMap.get(movie.id) === genres.length
            );

            // Remove duplicates from intersectionMovies
            const uniqueIntersectionMovies = Array.from(
              new Set(intersectionMovies.map((movie) => movie.id))
            ).map((id) => intersectionMovies.find((movie) => movie.id === id));

            console.log(uniqueIntersectionMovies);
            setMovies(uniqueIntersectionMovies);
          } else {
            // If only one genre, return all movies from that genre
            setMovies(allMovies);
          }
        } else if (searchMode === "name" && movieNameQueryParam) {
          const response = await movieApi.searchMovie(movieNameQueryParam);
          allMovies = response.data.content;
          setMovies(allMovies);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    handleSearch();
  }, [location.search, searchMode]);

  return (
    <div className="searchresult">
      <Header className="Header"></Header>
      <div className="query-value">
        {searchMode === "name" && <h2>Results for "{query}":</h2>}
        {searchMode === "genre" && (
          <h2>Results with genres: {query.split("-").join(" & ")}</h2>
        )}
      </div>
      <div className="search-movie-list">
        {movies.map((movie) => (
          <div className="movieCard">
            <MovieCard key={movie.id} item={movie} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;

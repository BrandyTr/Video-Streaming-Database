import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import MovieCard from "../../components-main/movie-card/MovieCard";
import { image_API } from "../../api/apiConfig";
import movieApi, { genres } from "../../api/movieApi";
import "./search.css";
import Header from "../../components-main/header/Header";
const Search = () => {
  const location = useLocation();
  const [searchMode, setSearchMode] = useState("name");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedRating, setSelectedRating] = useState(0);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const movieNameQueryParam = queryParams.get("movieName");
    if (movieNameQueryParam) {
      setSearchMode("name");
      setQuery(movieNameQueryParam);
      console.log(query);
    } else {
      setSearchMode("filter");
      setQuery(location.search);
    }
  }, [location.search]);

  useEffect(() => {
    const handleSearch = async () => {
      setLoading(true);
      try {
        let allMovies = [];
        if (searchMode === "filter") {
          const queryParams = new URLSearchParams(query);
          const genreQueryParam = queryParams.get("genres");
          const ratingQueryParam = queryParams.get("ratings");
          console.log(genreQueryParam, ratingQueryParam);
          if (genreQueryParam) {
            const queryGenres = genreQueryParam.split("-");
            console.log(queryGenres);
            const requests = queryGenres.map((genre) =>
              movieApi.getMoviesByCategory(genre)
            );
            const responses = await Promise.all(requests);
            allMovies = responses.flatMap((response) => response.data.content);
            console.log(allMovies);
            if (queryGenres.length > 1) {
              const movieCountMap = new Map();
              allMovies.forEach((movie) => {
                movieCountMap.set(
                  movie.id,
                  (movieCountMap.get(movie.id) || 0) + 1
                );
              });

              // Filter movies that appear more than once in each genre
              const intersectionMovies = allMovies.filter(
                (movie) => movieCountMap.get(movie.id) === queryGenres.length
              );

              // Remove duplicates from intersectionMovies
              allMovies = Array.from(
                new Set(intersectionMovies.map((movie) => movie.id))
              ).map((id) =>
                intersectionMovies.find((movie) => movie.id === id)
              );
            }
          } else {
            // Fetch movies from all categories if no genres are selected
            const requests = genres.map((genre) =>
              movieApi.getMoviesByCategory(genre)
            );
            const responses = await Promise.all(requests);
            allMovies = responses.flatMap((response) => response.data.content);
          }
          if (ratingQueryParam) {
            const ratings = ratingQueryParam.split("-");
            const minRating = Math.min(...ratings.map(Number));
            const maxRating = Math.max(...ratings.map(Number)) + 1;

            allMovies = allMovies.filter(
              (movie) =>
                movie.averageRating >= minRating &&
                movie.averageRating < maxRating
            );
          }
        } else if (searchMode === "name") {
          const queryParams = new URLSearchParams(location.search);
          const movieNameQueryParam = queryParams.get("movieName");
          const response = await movieApi.searchMovie(movieNameQueryParam);
          allMovies = response.data.content;
        }
        setMovies(allMovies);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    handleSearch();
  }, [query, searchMode]);
  return (
    <div className="searchresult">
      <Header className="Header"></Header>
      <div>
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <div>
            <div className="query-value">
              {searchMode === "name" && (
                <h2>
                  {""}
                  {movies.length} Results for "{query}":
                </h2>
              )}
              {searchMode === "filter" && (
                <h2>
                  {" "}
                  {movies.length} results with genres:{" "}
                  {query.split("-").join(" & ")}
                </h2>
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
        )}
      </div>
    </div>
  );
};

export default Search;

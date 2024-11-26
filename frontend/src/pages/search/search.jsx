import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MovieCard from "../../components-main/movie-card/MovieCard";
import { image_API } from "../../api/apiConfig";
import movieApi, { genres } from "../../api/movieApi";
import "./search.css";
import Header from "../../components-main/header/Header";

const Search = () => {
  const location = useLocation();
  const [searchMode, setSearchMode] = useState("filter");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedRating, setSelectedRating] = useState(0);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const movieNameQueryParam = queryParams.get("movieName");
    if (movieNameQueryParam) {
      setSearchMode("name");
      setQuery(location.search);
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
        const queryParams = new URLSearchParams(query);
        const movieNameQueryParam = queryParams.get("movieName");
        const genreQueryParam = queryParams.get("genres");
        const ratingQueryParam = queryParams.get("ratings");

        if (movieNameQueryParam) {
          const response = await movieApi.searchMovie(movieNameQueryParam);
          allMovies = response.data.content;
        }

        if (genreQueryParam || ratingQueryParam) {
          let filteredMovies = allMovies;

          if (genreQueryParam) {
            const responses = await movieApi.getMoviesByCategory(genreQueryParam);
            console.log(responses);
            const genreMovies = responses.data.content;
            console.log(genreMovies);

            if (allMovies.length > 0) {
              const movieIds = new Set(allMovies.map((movie) => movie.id));
              filteredMovies = genreMovies.filter((movie) =>
                movieIds.has(movie.id)
              );
            } else {
              filteredMovies = genreMovies;
            }
              console.log(filteredMovies);

            // if (genres.length > 1) {
            //   const movieCountMap = new Map();
            //   filteredMovies.forEach((movie) => {
            //     movieCountMap.set(
            //       movie.id,
            //       (movieCountMap.get(movie.id) || 0) + 1
            //     );
            //   });            

            //   // Remove duplicates from intersectionMovies
            //   filteredMovies = Array.from(
            //     new Set(intersectionMovies.map((movie) => movie.id))
            //   ).map((id) =>
            //     intersectionMovies.find((movie) => movie.id === id)
            //   );
            // }

          } else  if (movieNameQueryParam && ratingQueryParam) {
            // Fetch movies by name and filter by rating if no genres are selected
            const response = await movieApi.searchMovie(movieNameQueryParam);
            filteredMovies = response.data.content;
          } else {
            // Fetch movies from all categories if no genres are selected
            const allGenres = genres.join("-");
            const responses = await  movieApi.getMoviesByCategory(allGenres);
            const allGenreMovies =  responses.data.content;
            filteredMovies = allGenreMovies;
            console.log(filteredMovies);
          }
          if (ratingQueryParam) {
            const ratings = ratingQueryParam.split("-");
            const minRating = Math.min(...ratings.map(Number));
            const maxRating = Math.max(...ratings.map(Number)) + 1;

            filteredMovies = filteredMovies.filter(
              (movie) =>
                movie.averageRating >= minRating &&
                movie.averageRating < maxRating
            );
          }
          allMovies = filteredMovies;
        }

        setMovies(allMovies);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      handleSearch();
    }
  }, [query, searchMode]);

return (
    <div className="searchresult">
      <Header className="Header" setQuery={setQuery} />
      <div>
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <div>
            <div className="query-value">
              {(() => {
                const queryParams = new URLSearchParams(query);
                const movieName = queryParams.get("movieName");
                const genreQueryParam = queryParams.get("genres");
                const ratingQueryParam = queryParams.get("ratings");
                const genres = genreQueryParam
                  ? genreQueryParam.split("-").join(" & ")
                  : "";
                const ratings = ratingQueryParam
                  ? ratingQueryParam.split("-").map(r => `${r}`).join(" & ")
                  : "";

                if (movieName) {
                  return (
                    <h2>
                      {movies.length} results for "{movieName}"{" "}
                      {genres || ratings ? "with " : ""}
                      {genres ? `genres: ${genres}` : ""}
                      {genres && ratings ? " , " : ""}
                      {ratings ? `ratings: ${ratings}` : ""}
                    </h2>
                  );
                } else {
                  return (
                    <h2>
                      {movies.length} results with{" "}
                      {genres ? `genres: ${genres}` : ""}
                      {genres && ratings ? " , " : ""}
                      {ratings ? `ratings: ${ratings}` : ""}
                    </h2>
                  );
                }
              })()}
            </div>
            <div className="search-movie-list">
              {movies.map((movie) => (
                <div className="movieCard" key={movie.id}>
                  <MovieCard item={movie} />
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
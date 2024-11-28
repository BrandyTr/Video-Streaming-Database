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
      let  optionMovies = [];
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

        const options = {
          genreNames: genreQueryParam ? genreQueryParam.split("-") : [],
          minRatings: ratingQueryParam ? ratingQueryParam.split("-").map(Number):[]
,        };

        const response = await movieApi.getMoviesByOption(options);
        console.log(response);
        optionMovies = response.data.content;
        
        if (allMovies.length > 0) {
          const movieIds = new Set(allMovies.map((movie) => movie.id));
          filteredMovies = optionMovies.filter((movie) =>
            movieIds.has(movie.id)
          );
        } else {
          filteredMovies = optionMovies;
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
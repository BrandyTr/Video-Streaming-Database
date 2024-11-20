import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../../components/card/card";
import { image_API } from "../../api/apiConfig";
import movieApi from "../../api/movieApi";

const Search = () => {
  const { searchTerm } = useParams();
  let movieList = [];
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const handleSearch = async () => {
      try {
        const response = await movieApi.searchMovie(searchTerm);
        if (response && response.data && response.data.content) {
          movieList = response.data.content;
          console.log(movieList);
          setMovies(movieList);
          console.log(movies);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    handleSearch();
  }, [searchTerm]);

  return (
    <div>
      <div className="content">
        {movies.map((movie) => (
          <Card
            key={movie.id}
            id={movie.id}
            title={movie.title}
            rating={movie.ratingCount}
            views={movie.view}
            thumbnail={image_API.w500Image(movie.poster_path)}
          />
        ))}
      </div>
    </div>
  );
};

export default Search;

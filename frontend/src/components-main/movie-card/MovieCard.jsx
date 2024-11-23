import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import Button from "../button/Button";
import movieApi from "../../api/movieApi";
import { image_API } from "../../api/apiConfig";
import { FaUser } from "react-icons/fa";
import "./movie-card.css";

const MovieCard = (props) => {
  const [genres, setGenres] = useState([]);

  const item = props.item;

  const link = `/detail/${item.id}`;

  const bg = image_API.originalImage(item.backdrop_path || item.poster_path);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await movieApi.getMovieDetails(item.id);

        if (response.data.content.genres) {
          const fetchedGenres = response.data.content.genres; // Ensure this is the correct path
          setGenres(fetchedGenres); // Update state with fetched data
          console.log("Fetched data:");
          console.log(response.data.content.genres);
        }
        // console.log("Fetched data:", response.data.content);
      } catch (error) {
        // console.error("Error fetching data:", error);
      }
    };
    fetchGenres();
  }, [item.id]); // Add id as a dependency to useEffect

  const genreNames = genres
    .slice(0, 2)
    .map((genre) => genre.name)
    .join(" • ");

  return (
    <Link to={link}>
      <div className="movie-card" style={{ backgroundImage: `url(${bg})` }}>
        {/* <Button>
                    <i className="">hi</i>
                </Button> */}

        <div className="movie-rating-box">
          <p>{item.averageRating}</p>
        </div>
        <div className="title-box-wrapper">
          <h3>{item.title || item.name}</h3>
          <div className="movie-info-hover">
            <div className="card-scores">
              <div className="rating-box-hover">
                <p>({item.averageRating})</p>
              </div>
              <p>|</p>
              <div className="card-views">
                <p>{item.ratingCount}</p>
                <FaUser></FaUser>
              </div>
            </div>
            <p>{genreNames}</p>
            {/* <p>{genres.map(genre => genre.name).join(' • ')}</p> */}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;

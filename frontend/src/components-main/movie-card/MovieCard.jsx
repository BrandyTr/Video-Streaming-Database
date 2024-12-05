import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import Button from "../button/Button";
import movieApi from "../../api/movieApi";
import { image_API } from "../../api/apiConfig";
import { FaUser } from "react-icons/fa";
import { IoIosArrowDropdown } from "react-icons/io";
import { ImPlay } from "react-icons/im";

import "./movie-card.css";

const MovieCard = (props) => {
  const [genres, setGenres] = useState([]);
  const navigate = useNavigate();

  const item = props.item;

  const detailLink = `/detail/${item.id}`;
  const watchingLink = `/watching/${item.id}`;

  const bg = image_API.originalImage(item.backdrop_path || item.poster_path);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await movieApi.getMovieDetails(item.id);

        if (response.data.content.genres) {
          const fetchedGenres = response.data.content.genres; // Ensure this is the correct path
          setGenres(fetchedGenres); // Update state with fetched data
          // console.log("Fetched data:");
          // console.log(response.data.content.genres);
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

  const handleCardClick = () => {
    navigate(watchingLink);
  };
  const handleTitleBoxClick = (event) => {
    event.stopPropagation();
    navigate(detailLink);
  };
  return (
    <div
      className="movie-card"
      style={{ backgroundImage: `url(${bg})` }}
      onClick={handleCardClick}
    >
      {/* <Button>
                    <i className="">hi</i>
                </Button> */}
      <div className="card-overlay">
        <ImPlay className="card-play-btn" />
      </div>
      <div className="movie-rating">
        <div className="movie-rating-box">
          <p>{item.averageRating}</p>
        </div>
      </div>
      <div className="title-box-wrapper" onClick={handleTitleBoxClick}>
        <h3>{item.title || item.name}</h3>
        <div className="movie-info-hover">
          <div className="movie-info-container">
            <IoIosArrowDropdown className="card-dropdown-btn" />
            <div className="card-scores">
              <div className="rating-box-hover">
                <p>{item.averageRating}</p>
                <p>({item.ratingCount})</p>
              </div>

              <div className="card-views">
                <p>|</p>
                <p>{item.view}</p>
                <FaUser></FaUser>
              </div>
            </div>

            {/* <p>{genres.map(genre => genre.name).join(' • ')}</p> */}
          </div>
          <p>{genreNames}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;

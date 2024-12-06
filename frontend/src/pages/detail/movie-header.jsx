import React, { useEffect, useState } from "react";
import "./movie-header.css";
import { useNavigate } from "react-router-dom";
import { image_API } from "../../api/apiConfig";
import Rating from "./rateMovieFunct";
import Button from "../../components-main/button/Button";

import {
  FaHeart,
  FaPlay,
  FaFilm,
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaUser,
} from "react-icons/fa";
import axios from "axios";

const DetailHeader = ({ movie, credit }) => {
  const id = movie.id;
  const genres = movie.genres ? movie.genres.map((genre) => genre.name) : [];

  // Tạo URL cho poster
  const poster = image_API.originalImage(
    movie.poster_path ? movie.poster_path : movie.backdrop_path
  );
  const backdrop = image_API.originalImage(
    movie.backdrop_path ? movie.backdrop_path : movie.poster_path
  );

  const navigate = useNavigate();

  // Lấy thông tin credit (đạo diễn, nhà sản xuất, biên kịch)

  const directors = credit.crews.find((member) => member.job === "Director");
  const producers = credit.crews.find(
    (member) => member.job === "Producer" || member.job === "Executive Producer"
  );
  const writers = credit.crews.find(
    (member) => member.job === "Writer" || member.job === "Story"
  );
  // console.log("movie", writers);
  // console.log("dir", directors);

  return (
    <div
      className="detail-header-item"
      style={{ backgroundImage: `url(${backdrop})` }}
    >
      <div className="detail-backdrop">
        <img src={poster} alt={`${movie.title} poster`} />
      </div>
      <div className="frame1">
        <div className="detail-title">
          <h2>{movie.title}</h2>
        </div>

        <div className="movie-info">
          <div className="watch-option-buttons">
            <Button
              className="Watchnow"
              onClick={() => navigate(`/watching/${item.id}/full-time`)}
            >
              <div className="Playbutton">
                <FaPlay />
              </div>
              <p>Watch Now</p>
            </Button>

            <button
              className="Trailer"
              onClick={() => navigate(`/watching/${item.id}/trailer`)}
            >
              <FaFilm />
              Trailer
            </button>
            <button className="Heart">
              <FaHeart />
            </button>
          </div>

          <div className="score">
            <div className="rate-button">
              <div className="avgRate">{movie.averageRating}</div>{" "}
              <div>({movie.ratingCount})</div>
            </div>
            <div></div>
            <div className="total-views">
              <p>|</p>
              {movie.view}
              <div>
                <FaUser></FaUser>
              </div>
            </div>
          </div>

          <div className="rating">
            <h4>Rate: </h4>
            <div className="stars">
              <Rating />
            </div>
          </div>

          <div className="genres">
            <h4>Genre: </h4>
            {genres.length > 0 ? (
              genres
                .map((genre, index) => (
                  <span key={index} className="genre">
                    {genre}
                  </span>
                ))
                .reduce((prev, curr) => [prev, " • ", curr])
            ) : (
              <span>No genres available</span>
            )}
          </div>

          <div className="overview">
            <p>{movie.overview}</p>
          </div>

          <div className="director">
            <p> Director:</p>
            <span> {directors ? directors.name : <p>N/A</p>}</span>
          </div>

          <div className="producer">
            <p>Producer:</p>
            <span> {producers ? producers.name : <span>N/A</span>}</span>
          </div>

          <div className="writer">
            <p>Writer:</p>
            <span> {writers ? writers.name : <p>N/A</p>}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailHeader;

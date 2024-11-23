import React, { useEffect, useState } from "react";
import "./movie-header.css";
import { Link } from "react-router-dom";
import { image_API } from "../../api/apiConfig";

import {
  FaHeart,
  FaPlay,
  FaFilm,
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
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

  // Tính toán số sao từ rating
  const ratingSum = movie.ratingSum || 0;
  const ratingCount = movie.ratingCount || 1; // Đảm bảo chia không bị lỗi khi ratingCount = 0
  const rating = ratingSum / ratingCount;

  const fullStars = Math.floor(rating / 2); // Số sao đầy
  const halfStar = rating % 2 >= 1 ? 1 : 0; // Nếu có nửa sao
  const emptyStars = 10 - (fullStars + halfStar); // Số sao rỗng

  // Lấy thông tin credit (đạo diễn, nhà sản xuất, biên kịch)

  const directors = credit.crews.find((member) => member.job === "Director");
  const producers = credit.crews.find(
    (member) => member.job === "Producer" || member.job === "Executive Producer"
  );
  const writers = credit.crews.find(
    (member) => member.job === "Writer" || member.job === "Story"
  );
  console.log("movie", writers);
  console.log("dir", directors);

  return (
    <div
      className="detail-header-item"
      style={{ backgroundImage: `url(${backdrop})` }}
    >
      <div className="frame1">
        <img
          className="detail-backdrop"
          src={poster}
          alt={`${movie.title} poster`}
        />
        <h2 className="title">{movie.title}</h2>
        <div className="movie-info">
          <div className="Buttons">
            <Link to={`/watching/${id}`}>
              <button className="Watchnow">
                <div className="Playbutton">
                  <FaPlay />
                </div>
                Watch Now
              </button>
            </Link>
            <button className="Trailer">
              <FaFilm />
              Trailer
            </button>
            <button className="Heart">
              <FaHeart />
            </button>
          </div>

          <div className="score">
            <div className="rate-button">
              {movie.ratingSum} ({movie.ratingCount})
            </div>
            <div className="view-button">{movie.view}</div>
          </div>

          <div className="rating">
            <h4>Rate: </h4>
            <div className="stars">
              {Array(fullStars)
                .fill()
                .map((_, index) => (
                  <FaStar key={index} color="#ffaa00" />
                ))}
              {halfStar === 1 && <FaStarHalfAlt color="#ffaa00" />}
              {Array(emptyStars)
                .fill()
                .map((_, index) => (
                  <FaRegStar
                    key={fullStars + halfStar + index}
                    color="#ffaa00"
                  />
                ))}
            </div>
          </div>

          <div className="genres">
            <h4>Genre: </h4>
            {genres.length > 0 ? (
              genres.map((genre, index) => (
                <span key={index} className="genre">
                  {genre}
                </span>
              ))
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

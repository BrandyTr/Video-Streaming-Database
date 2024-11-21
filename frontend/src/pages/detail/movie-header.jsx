import React from "react";
import "./movie-header.css";
import { Link, useParams } from "react-router-dom";
import { POSTER_BASE_URL } from "../../commonPaths";
import {
  FaHeart,
  FaPlay,
  FaFilm,
  FaUserFriends,
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
} from "react-icons/fa";

const DetailHeader = ({ movie, credit }) => {
  const id = movie.id;
  const genres = movie.genres ? movie.genres.map((genre) => genre.name) : [];
  console.log("movie", movie);
  const ratingSum = movie.ratingSum || 0;
  const ratingCount = movie.ratingCount || 1; // Đảm bảo chia không bị lỗi khi ratingCount = 0
  const rating = ratingSum / ratingCount;
  const fullStars = Math.floor(rating); // Số sao đầy
  const halfStar = rating % 1 >= 0.5 ? 1 : 0; // Nếu có nửa sao
  const emptyStars = 5 - (fullStars + halfStar); // Số sao rỗng

  //Director Producer Writer
  const director = credit.crews.find((member) => member.job === "Director");
  const producer = credit.crews.find(
    (member) => member.job === "Producer" || member.job === "Executive Producer"
  );
  const writer = credit.crews.find((member) => member.job === "Writer");

  return (
    <div className="Container">
      <div>
        <img
          className="poster"
          src={POSTER_BASE_URL + movie.poster_path}
          alt={`${movie.title} poster`}
        />
      </div>
      <div className="frame1">
        <h1 className="title">{movie.title}</h1>
        <div className=" Details">
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
              {movie.ratingSum} ({movie.ratingCount}){" "}
            </div>

            <div className="view-button"> {movie.view}</div>
          </div>
          <div className="rating">
            <h2>Rate: </h2>
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
            <h2>Genre: </h2>
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
          <div className="description">
            <div className="Director">
              <h4>Director:</h4>
              {director ? director.name : "N/A"}
            </div>
            <div className="Producer">
              <h4>Producer:</h4>
              {producer ? producer.name : "N/A"}
            </div>
            <div className="Writer">
              <h4>Writer:</h4>
              {writer ? writer.name : "N/A"}
            </div>
            <p>{movie.overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailHeader;

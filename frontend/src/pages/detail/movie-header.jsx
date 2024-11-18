import React from "react";
import "./movie-header.css";
import { Link, useParams } from "react-router-dom";
import { POSTER_BASE_URL } from "../../commonPaths";
import { FaHeart } from "react-icons/fa";
const DetailHeader = ({ movie, credit }) => {
  const id = movie.id;
  const genres = movie.genres ? movie.genres.map((genre) => genre.name) : [];
  return (
    <div className="Container">
      <div>
        <img
          className="poster"
          src={POSTER_BASE_URL + movie.poster_path}
          alt={`${movie.title} poster`}
        />
      </div>
      <div className="Info">
        <h1>{movie.title}</h1>
        <div className="Buttons">
          <Link to={`/watching/${id}`}>
            <button>Watch Now</button>
          </Link>
          <button>Trailer</button>
          <button className="heart">
            <FaHeart />
          </button>
        </div>
        <div className="score">
          <div className="box-button">
            {movie.ratingSum} ({movie.ratingCount}){" "}
          </div>
          <p> {movie.view}</p>
        </div>
        <div className="rating">
          <h2>Rate: </h2>
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
          <h2>Description: </h2>
          <p>{movie.overview}</p>
        </div>
      </div>
    </div>
  );
};

export default DetailHeader;

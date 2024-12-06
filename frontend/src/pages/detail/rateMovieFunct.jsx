import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./rateMovieFunct.css";
import movieApi from "../../api/movieApi";

const Rating = () => {
  const { id } = useParams();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [averageRating, setAverageRating] = useState(null);
  const [ratingCount, setRatingCount] = useState(0);
  const [hasRated, setHasRated] = useState(false);

  useEffect(() => {
    const fetchMovieRating = async () => {
      try {
        const response = await movieApi.getMovieDetails(id);
        console.log("Fetched data:", response.data);
        setAverageRating(response.data.averageRating);
        setRatingCount(response.data.ratingCount);
      } catch (error) {
        console.error("Error fetching movie rating:", error);
      }
    };
    fetchMovieRating();
  }, [id]);

  const handleRating = async (ratingValue) => {
    try {
      const response = await movieApi.rateMovie(id, ratingValue);
      setAverageRating(response.data.content.averageRating);
      setRatingCount(response.data.content.ratingCount);
      setRating(ratingValue);
      setHasRated(true);
    } catch (error) {
      console.log("Failed to rate", error);
    }
  };

  return (
    <div className="rating-page">
      {/* 10 stars for rating*/}
      <div className="star-rating">
        {[...Array(10)].map((_, index) => {
          const ratingValue = index + 1;
          return (
            <label key={index}>
              <input
                type="radio"
                name="rating"
                value={ratingValue}
                onClick={() => handleRating(ratingValue)}
                disabled={hasRated} // Disable the input if the user has rated
              />
              <FaStar
                className="star"
                color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                size={30}
                onMouseEnter={() => !hasRated && setHover(ratingValue)}
                onMouseLeave={() => !hasRated && setHover(null)}
              />
            </label>
          );
        })}
      </div>
      {hasRated && (
        <div className="hasRated-tooltip">Note: You have rated this movie!</div>
      )}
    </div>
  );
};

export default Rating;

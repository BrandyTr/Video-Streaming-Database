import React, { useState, useEffect } from 'react';
import { FaStar } from "react-icons/fa";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './rateMovieFunct.css'

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
        const response = await axios.get(`/api/movie/${id}/details`);
        console.log("Fetched data:", response.data);
        setAverageRating(response.data.averageRating);
        setRatingCount(response.data.ratingCount);

        // Check if the user has already rated the movie
        const userRatingResponse = await axios.get(`/api/movie/${id}/user-rating`);
        if (userRatingResponse.data.hasRated) {
          setRating(userRatingResponse.data.rating);
          setHasRated(true);
        }
      } catch (error) {
        console.error("Error fetching movie rating:", error);
      }
    };
    fetchMovieRating();
  }, [id]);

  const handleRating = async (ratingValue) => {
    try {
      const response = await axios.post(`/api/movie/${id}/rate`, { rating: ratingValue });
      setAverageRating(response.data.content.averageRating);
      setRatingCount(response.data.content.ratingCount);
      setRating(ratingValue);
      setHasRated(true);

      // Store the rating status in local storage
      localStorage.setItem(`hasRated-${id}`, 'true');
    } catch (error) {
      console.log("Failed to rate", error);
    }
  };

  useEffect(() => {
    // Check local storage for rating status
    const hasRatedStatus = localStorage.getItem(`hasRated-${id}`);
    if (hasRatedStatus === 'true') {
      setHasRated(true);
    }
  }, [id]);

  return (
    <div className="rating-page">
      {/* 10 stars for rating */}
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
              {hasRated && <div className="hasRated-tooltip">You have already rated this movie.</div>}

    </div>
  );
};

export default Rating;
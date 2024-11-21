import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Import useHistory
import "./detail.css";
import axios from "axios";
import DetailHeader from "./movie-header";
import Cast from "./cast";
import movieApi from "../../api/movieApi";

const Detail = () => {
  const { id } = useParams(); // Get id from URL
  const navigate = useNavigate(); // Initialize navigate
  const [movie, setMovie] = useState(null); // Initialize state as null
  const [credit, setCredit] = useState(null); // Initialize state as null

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        // Call the API to fetch movie details and credits
        const response = await movieApi.getMovieDetails(id);
        setMovie(response.data.content); // Update state with movie data
        setCredit(response.data.content.credit); // Update state with credit data
        console.log("Fetched data:", response.data); // Log the fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchMovieDetails();
  }, [id]); // Run the effect only when id changes

  // Render the component
  return (
    <div className="container">
      {movie && credit ? (
        <>
          <DetailHeader movie={movie} credit={credit} />
          <Cast credit={credit} />
        </>
      ) : (
        <p>Loading...</p> // Show loading text while data is being fetched
      )}
    </div>
  );
};

export default Detail;

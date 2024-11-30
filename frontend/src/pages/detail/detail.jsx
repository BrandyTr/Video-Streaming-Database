import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Import useHistory
import axios from "axios";
import DetailHeader from "./movie-header";
import Cast from "./cast";
import movieApi from "../../api/movieApi";
import { image_API } from "../../api/apiConfig";
import Rating from "./rateMovieFunct";
import Header from "../../components-main/header/Header";

const Detail = () => {
  const { id } = useParams(); // Get id from URL
  const navigate = useNavigate(); // Initialize navigate
  const [movie, setMovie] = useState(null); // Initialize state as null
  const [credit, setCredit] = useState(null); // Initialize state as null
  const [background, setBackground] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        // Call the API to fetch movie details and credits
        const response = await movieApi.getMovieDetails(id);
        setMovie(response.data.content); // Update state with movie data
        setCredit(response.data.content.credit); // Update state with credit data
        setBackground(
          image_API.originalImage(
            response.data.content.backdrop_path ||
              response.data.content.poster_path
          )
        );
        console.log("Fetched data:", response.data); // Log the fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchMovieDetails();
  }, [id]); // Run the effect only when id changes

  // Render the component style={{ backgroundImage: `url(${background})`,}}
   if (!movie && !credit)
    return (
      <div className="h-screen text-white relatvie">
        <div className="container">
          <Header />
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center -z-10 shimmer"></div>
      </div>
    );
  return (
    <div>
    {/* Header */}
      <div className="container">
        <Header />
      </div>
      {/* MovieInfo */}
      <div className="detail-header">
        <DetailHeader movie={movie} credit={credit}></DetailHeader>
      </div>
      {/* Cast */}
      <div className="container">
        <Cast credit={credit}></Cast>
        </div>
        </div>
  );
};


export default Detail;


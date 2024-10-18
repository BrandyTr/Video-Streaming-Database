import React from "react";
import { useNavigate, useParams } from "react-router-dom"; // Import useHistory
import { Card } from "../../commonPaths";
import "./detail.css";
import axios from "axios";
import { useEffect, useState } from "react";
import DetailHeader from "./movie-header";
import Cast from "./cast";

const Detail = () => {
  const { id } = useParams(); // Get id from URL
  const navigate = useNavigate(); // Initialize navigate
  const [movie, setMovie] = useState([]); // Initialize state as an empty array
  const [credit, setCredit] = useState([]); // Initialize state as an empty array
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`/api/movie/${id}/details`); // Fetch data for specific movie
        setMovie(response.data.content); // Update state with fetched data
        console.log("Fetched data:", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchMovie();
  }, []);
  useEffect(() => {
    const fetchCredit = async () => {
      try {
        const response = await axios.get(`/api/movie/${id}/details`); // Fetch data for specific movie
        setCredit(response.data.content.credit); // Update state with fetched data
        console.log("Fetched data:", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchCredit();
  }, []);
  return (
    <div className="container">
      <DetailHeader movie={movie} credit={credit} />
      <Cast credit={credit} />
    </div>
  );
};

export default Detail;

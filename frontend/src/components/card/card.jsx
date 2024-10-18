import React from "react";
import "./card.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
const Card = ({ title, id, thumbnail, rating, views }) => {
  const [genres, setGenres] = useState([]);
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(`/api/movie/${id}/details`);
        const fetchedGenres = response.data.content.genres; // Ensure this is the correct path
        setGenres(fetchedGenres); // Update state with fetched data
        console.log("Fetched data:", response.data.content);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (id) {
      fetchGenres();
    }
  }, [id]); // Add id as a dependency to useEffect

  const genre1 = genres[0] ? genres[0].name : "";
  const genre2 = genres[1] ? genres[1].name : "";
  const genre3 = genres[2] ? genres[2].name : "";

  // Dependency array ensures this runs only when the id changes
  return (
    <div className="card">
      <Link to={`/detail/${id}`}>
        <img className="thumbnail" src={thumbnail} />
        <div className="overlay"></div>
        <div className="details">
          <h1>{title}</h1>
          <div className="viewNrate">
            <h2>{rating}</h2>
            <h2>{views}</h2>
          </div>
          <div className="genre">
            <h3>{genre1}</h3>
            <h3>{genre2}</h3>
            <h3>{genre3}</h3>
          </div>
          <button className="trailer-button ">Watch trailer</button>
        </div>
      </Link>
    </div>
  );
};
export default Card;

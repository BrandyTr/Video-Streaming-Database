import React from "react";
import "./card.css";
import { Link } from "react-router-dom";

const Card = ({ title, id, description, thumbnail }) => (
  <div className="card">
    <Link to={`/watching/${id}`}>
      <img className="thumbnail" src={thumbnail} alt={title} />
      <div className="overlay"></div>
      <div className="details">
        <h1>{title}</h1>
        <h2>{description}</h2>
        <button className="trailer-button ">Watch trailer</button>
      </div>
    </Link>
  </div>
);
export default Card;

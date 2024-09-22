import React from "react";
import "./card.css";

const Card = ({ title, description, thumbnail, onClick }) => (
  <div className="card" onClick={onClick}>
    <img className="thumbnail" src={thumbnail} alt={title} />
    <div className="overlay"></div>
    <div className="details">
      <h1>{title}</h1>
      <h2>{description}</h2>
      <button className="trailer-button">Watch trailer</button>
    </div>
  </div>
);

export default Card;

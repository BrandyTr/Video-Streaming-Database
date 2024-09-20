import React from 'react';
import './card.css';

const Card = ({ title, description, thumbnail, onClick }) => (
  <div className="card" onClick={onClick}>
    <img src={thumbnail} alt={title} />
    <h2>{title}</h2>
    <p>{description}</p>
  </div>
);


export default Card;

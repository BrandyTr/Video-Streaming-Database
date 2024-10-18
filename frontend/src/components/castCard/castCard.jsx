import React from "react";
import { POSTER_BASE_URL } from "../../commonPaths"; // Adjust the import path as needed
import "./castCard.css";
const CastCard = ({ name, profile_path }) => {
  return (
    <div className="cast-card">
      <img src={POSTER_BASE_URL + profile_path} alt={`${name} backdrop`} />
      <p>{name}</p>
    </div>
  );
};

export default CastCard;

import React from "react";
import { image_API } from "../../api/apiConfig";
import "./castCard.css";

const CastCard = ({ name, profile_path }) => {
  return (
    <div className="cast-card">
      <img src={image_API.w500Image(profile_path)} alt={`${name} backdrop`} />
      <p>{name}</p>
    </div>
  );
};

export default CastCard; // Ensure the correct export

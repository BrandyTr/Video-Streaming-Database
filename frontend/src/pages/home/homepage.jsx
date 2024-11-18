import React from "react";
import { useNavigate } from "react-router-dom"; // Import useHistory
import { Card, POSTER_BASE_URL } from "../../commonPaths";
import "./homepage.css";
import axios from "axios";
import { useEffect, useState } from "react";

const Homepage = () => {
  const navigate = useNavigate(); // Get the navigate function

  const content = [
    {
      title: 'Jumanji',
      description: 'The next level',
      image: Images.jumanji1,
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    },
    {
      title: 'Jumanji 2',
      description: 'The next level 2',
      image: Images.jumanji2,
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    },
    {
      title: 'Avengers',
      description: 'Endgame',
      image: Images.endgame,
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    }
  ];

  const handleCardClick = (videoUrl) => {
    // Navigate to the video page with the video URL
    navigate(`/watching?url=${encodeURIComponent(videoUrl)}`);
  };

  return (
    <div className="content">
      {contents.map((movie, index) => (
        <Card
          key={movie.index}
          id={movie.id}
          title={movie.title}
          rating={movie.ratingCount}
          views={movie.view}
          thumbnail={POSTER_BASE_URL + movie.poster_path}
        />
      ))}
    </div>
  );
};

export default Homepage;

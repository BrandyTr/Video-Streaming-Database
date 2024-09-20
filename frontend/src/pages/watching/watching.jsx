import React from 'react';
import { useLocation } from 'react-router-dom';
import './watching.css';

const Watching = () => {
  const query = new URLSearchParams(useLocation().search);
  const videoUrl = query.get('url'); // Get the video URL from the query

  return (
    <div>
      <h1>Video Player</h1>
      {videoUrl ? (
        <div className="video-container">
          <iframe
            src={videoUrl.replace("watch?v=", "embed/")}
            title="Video Player"
            allowFullScreen
          />
        </div>
      
      ) : (
        <p>No video available. Please select a video to watch.</p>
      )}
    </div>
  );
}

export default Watching;

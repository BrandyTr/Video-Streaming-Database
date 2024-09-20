import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useHistory
import Card from '../../components/card/card';
import './homepage.css';

const Homepage = () => {
  const navigate = useNavigate(); // Get the navigate function

  const content = [
    {
      title: 'Jumanji',
      description: 'The next level',
      image: 'https://via.placeholder.com/150',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    },
    {
      title: 'Jumanji 2',
      description: 'The next level 2',
      image: 'https://via.placeholder.com/150',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    },
    {
      title: 'Avengers',
      description: 'Endgame',
      image: 'https://via.placeholder.com/150',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    }
  ];

  const handleCardClick = (videoUrl) => {
    // Navigate to the video page with the video URL
    navigate(`/watching?url=${encodeURIComponent(videoUrl)}`);
  };

  return (
    <div className='content'>
      {content.map((item, index) => (
        <Card 
          key={index}
          title={item.title} 
          description={item.description} 
          thumbnail={item.image} 
          onClick={() => handleCardClick(item.videoUrl)} // Handle card click
        />
      ))}
    </div>
  );
}

export default Homepage;

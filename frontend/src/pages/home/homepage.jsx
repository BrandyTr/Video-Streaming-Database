import React from "react";
import { useNavigate } from "react-router-dom"; // Import useHistory
import { Images, Card } from "../../commonPaths";
import "./homepage.css";

const Homepage = () => {
  const navigate = useNavigate(); // Get the navigate function

  const content = [
    {
      title: "Jumanji",
      description:
        "Two children come across a magical board game. While playing it, they meet Alan, a man who was trapped in the game, and attempt to free him while facing different kinds of danger.",
      image: Images.jumanji1,
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      title: "Jumanji 2",
      description:
        "When four students play with a magical video game, they are drawn to the jungle world of Jumanji, where they are trapped as their avatars. To return to the real world, they must finish the game.",
      image: Images.jumanji2,
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      title: "Avengers",
      description:
        "After Thanos, an intergalactic warlord, disintegrates half of the universe, the Avengers must reunite and assemble again to reinvigorate their trounced allies and restore balance.",
      image: Images.endgame,
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
  ];

  const handleCardClick = (videoUrl) => {
    // Navigate to the video page with the video URL
    navigate(`/watching?url=${encodeURIComponent(videoUrl)}`);
  };

  return (
    <div className="content">
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
};

export default Homepage;

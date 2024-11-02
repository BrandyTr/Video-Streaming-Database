import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./watching.css";
import axios from "axios";
import { useEffect, useState } from "react";

const Watching = () => {
  const { id } = useParams(); //watching/:id
  const [testLink, setTestlink] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getLink = async () => {
      try {
        const response = await axios.get(`/api/movie/${id}/details`);
        console.log("Fetched data:", response.data);
        const fullVideo = response.data.content.videos.find(
          (video) => video.type === "full-time" // lay field full-time cua hai loai video(full-time, trailer)
        );
        if (fullVideo) {
          setTestlink(fullVideo.key); // Update state bang link phim
        } else {
          console.log("No full-time video available.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getLink();
  }, []);

  // increase view
  useEffect(() => {
    // Set a timer to count one view after 1 minutes
    const timer = setTimeout(() => {
      increaseViewCount(); // Increment the view count after 1 minutes
    }, 1 * 60 * 1000);

    return () => clearTimeout(timer); // Clear the timer if people watch movie before 1 minutes
  }, []);

  // increase view count
  const increaseViewCount = async () => {
    try {
      await axios.patch(`/api/movie/${id}/view`);
      console.log(id);
    } catch (error) {
      console.error(error);
    }
  };

  // link to rate video page
  const clickRateButton = () => {
    navigate(`/movie/${id}/rate`);
  };

  return (
    <div>
      {testLink ? (
        <div className="video-container">
          <iframe src={testLink} title="Video Player" allowFullScreen />
        </div>
      ) : (
        <p>No video available. Please select a video to watch.</p>
      )}
      <button onClick={clickRateButton}>Rate this Movie</button>
    </div>
  );
};

export default Watching;

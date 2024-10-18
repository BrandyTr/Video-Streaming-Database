import React from "react";
import { useParams } from "react-router-dom";
import "./watching.css";
import axios from "axios";
import { useEffect, useState } from "react";

const Watching = () => {
  const { id } = useParams(); //watching/:id
  const [testLink, setTestlink] = useState([]);
  //
  useEffect(() => {
    const getLink = async () => {
      try {
        const response = await axios.get(`/api/movie/${id}/details`);
        console.log("Fetched data:", response.data);
        const fullVideo = response.data.content.videos.find(
          (video) => video.type === "full-time: " // lay field full-time cua hai loai video(full-time, trailer)
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
  //testLink la link phim chieu len Video Player
  return (
    <div>
      {testLink ? (
        <div className="video-container">
          <iframe src={testLink} title="Video Player" allowFullScreen />
        </div>
      ) : (
        <p>No video available. Please select a video to watch.</p>
      )}
    </div>
  );
};

export default Watching;

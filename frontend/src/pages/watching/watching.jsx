import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./watching.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";

const Watching = () => {
  const { id, type } = useParams(); //watching/:id or watching/:id/:type
  const [videoLink, setVideoLink] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getLink = async () => {
      try {
        const response = await axios.get(`/api/movie/${id}/details`);
        console.log("Fetched data:", response.data);
        const movieData = response.data.content;

        let video = null;
        if (type === "trailer") {
          video = response.data.content.videos.find(
            (video) => video.type === "Trailer"
          );
          if (video) {
            setVideoLink(`https://www.youtube.com/embed/${video.key}`);
          }
        } else {
          video = response.data.content.videos.find(
            (video) => video.type === "full-time"
          );
          if (video) {
            setVideoLink(video.key); // Update state with the video link
          } else {
            // If no full-time video found, try to find trailer
            video = response.data.content.videos.find(
              (video) => video.type === "Trailer"
            );
            if (video) {
              setVideoLink(`https://www.youtube.com/embed/${video.key}`);
            }
          }
        }
        if (!video) {
          console.log(`No ${type || "full-time"} video available.`);
        }
        const watchingList =
          JSON.parse(localStorage.getItem("watchingList")) || [];
        const isAlreadyInList = watchingList.some(
          (movie) => movie.id === movieData.id
        );
        if (!isAlreadyInList) {
          const newMovie = {
            id: movieData.id,
            title: movieData.title,
            backdrop_path: movieData.backdrop_path,
            poster_path: movieData.poster_path,
            averageRating: movieData.averageRating || 0,
            genres: movieData.genres || [],
            ratingCount: movieData.ratingCount || 0,
            view: movieData.view || 0,
          };
          watchingList.push(newMovie);
          localStorage.setItem("watchingList", JSON.stringify(watchingList));
          console.log("Movie added to watching list:", newMovie);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getLink();
  }, [id, type]);

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
  const handleGoBack = () => {
    navigate(`/`);
  };

  return (
    <div>
      {videoLink ? (
        <div className="video-container">
          <div className="go-back">
            <FaArrowLeftLong className="go-back-btn" onClick={handleGoBack} />
          </div>
          <iframe
            src={videoLink}
            title="Video Player"
            allowFullScreen
            className="full-screen-iframe"
          />
        </div>
      ) : (
        <p>No video available. Please select a video to watch.</p>
      )}
      {/* <button onClick={clickRateButton}>Rate this Movie</button> */}
    </div>
  );
};

export default Watching;

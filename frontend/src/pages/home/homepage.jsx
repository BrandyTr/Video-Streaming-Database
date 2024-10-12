import React from "react";
import { useNavigate } from "react-router-dom"; // Import useHistory
import { Images, Card } from "../../commonPaths";
import "./homepage.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { POSTER_BASE_URL } from "../../utils/constants";

const Homepage = () => {
  const navigate = useNavigate(); // Initialize navigate
  const [contents, setContents] = useState([]); // Initialize state as an empty array

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get("/api/movie/popular");
        setContents(response.data.content); // Update state with fetched data
        console.log("Fetched data:", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchContent();
  }, []);

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

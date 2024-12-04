import axios from "axios";
import { useEffect, useState } from "react";

import Header from "../../components-main/header/Header";
import HeroSlide from "../../components-main/hero-slide/HeroSlide";
import MovieList from "../../components-main/movie-list/MovieList";
import { movieType } from "../../api/movieApi";

const HomePage_Main = () => {
  const [contents, setContents] = useState([]); // Initialize state as an empty array
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get("/api/movie/popular");
        setContents(response.data.content); // Update state with fetched data
        console.log("HIIIIIIIIII");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchContent();
  }, []);
  if (!contents)
    
    return (
      <div className="h-screen text-white relatvie">
        <div className="container">
          <Header />
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center -z-10 shimmer"></div>
      </div>
    );
  return (
    <div>
      {/* Header */}
      <div className="container">
        <Header />
      </div>
      {/* Hero-slide */}
      <HeroSlide></HeroSlide>
      <div className="container">
        <div className="section mb-3"></div>
        <div className="section_header mb-2">
          <h2>Trending Movies</h2>
        </div>
        <MovieList type={movieType.trending}></MovieList>
      </div>
    </div>
  );
};

export default HomePage_Main;

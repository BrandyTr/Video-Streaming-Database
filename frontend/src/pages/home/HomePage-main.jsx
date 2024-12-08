import axios from "axios";
import { useEffect, useState } from "react";
import "./homePage-main.css";
import Header from "../../components-main/header/Header";
import HeroSlide from "../../components-main/hero-slide/HeroSlide";
import MovieList from "../../components-main/movie-list/MovieList";
import { movieType } from "../../api/movieApi";

const HomePage_Main = () => {
  const [contents, setContents] = useState([]); // Initialize state as an empty array
  const [continuousMovies, setContinuousMovies] = useState([]);

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

  useEffect(() => {
    const watchingList = JSON.parse(localStorage.getItem("watchingList")) || [];
    setContinuousMovies(watchingList);
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
        <h2 className="section_header mb-2">Popular Movies</h2>
        <MovieList type={movieType.popular}></MovieList>

        {/*<h2 className="section_header mb-2">Top 10 highest rate </h2>
        <MovieList type="top-rated"></MovieList> */}

        <h2>Continue watching</h2>
        {continuousMovies.length > 0 ? (
          <MovieList movies={continuousMovies} type="continuous-watching" />
        ) : (
          <div className="no-movies">
            <p>No movies in progress. Try watching something! </p>
          </div>
        )}
        <br></br>
      </div>
    </div>
  );
};

export default HomePage_Main;

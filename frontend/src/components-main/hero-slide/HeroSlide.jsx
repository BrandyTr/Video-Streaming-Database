import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Swiper: create carousel (slide show images or content)
import SwiperCore from "swiper";
import "swiper/css";

import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "./hero-slide.css";

import movieApi, { movieType } from "../../api/movieApi";
import axios from "axios";
import { image_API } from "../../api/apiConfig";
import Button, { OutlineButton } from "../button/Button";
import { FaUser } from "react-icons/fa";

const HeroSlide = () => {
  SwiperCore.use([Autoplay]);

  // set empty array for movie items
  const [movieItems, setMovieItems] = useState([]);
  const [averageRating, setAverageRating] = useState(null);
  const [ratingCount, setRatingCount] = useState(0);

  // get random movie img
  const shuffleArrayMovie = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    const getMovies = async () => {
      const params = { page: 1 };
      try {
        // const response = await movieApi.getMoviesList(movieType.trending);
        const response = await movieApi.getMoviesList(
          movieType.trending,
          params
        );
        // console.log( "hi:" + response.data.content[0].backdrop_path);
        // setContents(response.data.content);
        // set movie items to the first 5 movies will update in sate which movieItems
        // setMovieItems(response.data.content.slice(0, 5));

        // Đảm bảo rằng `movieItems` chỉ được gán khi có dữ liệu
        if (response && response.data.content) {
          // console.log("hi")
          setMovieItems(shuffleArrayMovie(response.data.content).slice(0, 8));
          const fetchRating = response.data.content.averageRating;
          const fetchNumOfRating = response.data.ratingCount;
          setAverageRating(fetchRating);
          setRatingCount(fetchNumOfRating);
          // console.log(response);
          // console.log("movieItems are: ")
          // console.log(movieItems)
          // console.log("END")
        } else {
          console.log("No movies found in the response.");
        }
      } catch (error) {
        console.log("Failed to fetch movies: ", error.message);
      }
    };
    getMovies();
  }, []);

  return (
    // <h1>HI</h1>
    <div className="hero-slide">
      <Swiper
        modules={[Autoplay]}
        grabCursor={true} // show grab cursor when hover
        spaceBetween={0} // space between slides
        slidesPerView={1} // number of slides per view (slides visible)
        direction="horizontal" // slide direction
        loop={true} // loop slides
      // autoplay={{
      //     delay: 2000, // delay between slides
      //     disableOnInteraction: false // stop autoplay on user interaction
      // }}
      >
        {movieItems.map((movie, index) => {
          // console.log("movie is: ")
          // console.log(movie.title)
          // console.log(image_API.originalImage(movie.backdrop_path))

          return (
            <SwiperSlide key={index}>
              {({ isActive }) => (
                <HeroSlideItem
                  movie={movie}
                  className={`${isActive ? "active" : ""}`}
                />
                // <img src={image_API.originalImage(movie.backdrop_path)} alt="" />
              )}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

// content inside HeroSlide component
const HeroSlideItem = (props) => {
  // redirect to movie detail page when click
  // let navigate = useNavigate();

  const item = props.movie;

  // if background image is not available, use poster image
  const background = image_API.originalImage(
    item.backdrop_path ? item.backdrop_path : item.poster_path
  );

  return (
    <div
      className={`hero-slide_item ${props.className}`}
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="hero-slide_item_content container">
        <div className="hero-slide_item_content_info">
          <h2 className="title">{item.title}</h2>
          <div className="rate and views">
            <p className="rating">{item.averageRating} ({item.ratingCount})</p>
            <p className="divider"> | </p>
            <p className="views"> {item.view} </p>
            <FaUser></FaUser>
          </div>
          <p className="overview">{item.overview}</p>
          <div className="btns">
            <Button onClick={() => navigate("/movie/" + item.id)}>
              Watch Now
            </Button>
            <OutlineButton onClick={() => console.log("Trailer")}>
              Trailer
            </OutlineButton>
          </div>
        </div>
        {/* POSTER */}
        <div className="hero-slide_item_content_poster">
          <img src={image_API.w500Image(item.poster_path)} alt={item.title} />
        </div>
      </div>
    </div>
  );
};
export default HeroSlide;

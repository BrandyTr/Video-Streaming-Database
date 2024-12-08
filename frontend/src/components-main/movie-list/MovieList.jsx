import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import "./movie-list.css";
import "swiper/css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Link, useLocation } from "react-router-dom";

import MovieCard from "../movie-card/MovieCard";
import Button from "../button/Button";
import { image_API } from "../../api/apiConfig";
import movieApi from "../../api/movieApi";

const MovieList = (props) => {
  const [movies, setMovies] = useState(props.movies || []);

  useEffect(() => {
    if (!props.movies) {
      const getList = async () => {
        const params = {};
        let response;
        if (props.type === "top-rated") {
          response = await movieApi.getTopRatedMovies(params);
        } else {
          response = await movieApi.getMoviesList(props.type, params);
        }
        setMovies(response.data.content);
      };
      getList();
    }
  }, [props.type, props.movies]);

  return (
    <div className="movie-list">
      <Swiper grabCursor={true} spaceBetween={20} slidesPerView={"auto"}>
        {movies.map((item, index) => (
          <SwiperSlide key={index}>
            <MovieCard item={item}></MovieCard>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

MovieList.propTypes = {
  type: PropTypes.string.isRequired,
};

export default MovieList;

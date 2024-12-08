/* eslint-disable no-unused-vars */
import React, { useState, useEffect, Suspense, lazy } from "react";
import "./AdminDashboard.css";
import { useGetAllMovies } from "../../hooks/getTrendingContent";
import axios from "axios";
import toast from "react-hot-toast";

// Lazily load components
const Header = lazy(() => import("../../components-main/header/Header"));
const MovieCard = lazy(() => import("../../components-main/movie-card/MovieCard"));

const AdminDashboard = () => {
  const { allMovies, setAllMovies } = useGetAllMovies(); // Assuming useGetAllMovies provides a state setter for allMovies

  const handleReleased = async (movieID) => {
    try {
      // Make the API call to toggle release status
      const response = await axios.get(`/api/movie/${movieID}/toggleRelease`);
      console.log(response);
      const updatedMovie = response.data.content; // The updated movie from the response

      // Update the corresponding movie in the allMovies array
      setAllMovies((prevMovies) =>
        prevMovies.map((movie) =>
          movie._id === updatedMovie._id
            ? { ...movie, isPublished: updatedMovie.isPublished }
            : movie
        )
      );

      toast.success("Update successfully!");
    } catch (err) {
      toast.error(err.response?.data.message || "Update failed!");
    }
  };

  if (!allMovies) {
    return (
      <>
        <Suspense fallback={<div className="loading">Loading...</div>}>
          <Header />
        </Suspense>
        <div className="absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center -z-10 shimmer"></div>
      </>
    );
  }

  return (
    <>
      <Suspense fallback={<div className="loading">Loading Header...</div>}>
        <Header />
      </Suspense>
      <div className="search-movie-list">
        <Suspense fallback={<div className="loading">Loading Movies...</div>}>
          {allMovies.map((movie) => (
            <div className="movieCard" key={movie.id}>
              <MovieCard item={movie} />
              <div className="mt-5 flex justify-between">
                {movie.isPublished ? (
                  <button
                    onClick={() => {
                      handleReleased(movie._id);
                    }}
                    className={"text-xs bg-green-600 rounded-2xl px-1 py-2 sm:px-4 sm:text-sm"}
                  >
                    Released
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      handleReleased(movie._id);
                    }}
                    className={"text-xs bg-red-600 rounded-2xl px-1 py-2 sm:px-4 sm:text-sm"}
                  >
                    Unreleased
                  </button>
                )}
                <button className="text-xs bg-first-blue rounded-2xl px-1 py-2 sm:px-4 sm:text-sm">Update Movie</button>
              </div>
            </div>
          ))}
        </Suspense>
      </div>
    </>
  );
};

export default AdminDashboard;

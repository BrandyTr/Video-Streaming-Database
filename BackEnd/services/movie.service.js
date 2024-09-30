const Movie = require("../models/movie.model");

// Create a new movie in the database
exports.createMovie = async (movieDetail, genreIds, creditId, videoIds) => {
  try {
    const movie = new Movie({
      title: movieDetail.title,
      overview: movieDetail.overview,
      release_date: movieDetail.release_date,
      runtime: movieDetail.runtime,
      poster_path: movieDetail.poster_path,
      backdrop_path: movieDetail.backdrop_path,
      genres: genreIds,
      credit: creditId,
      videos: videoIds ? videoIds : [],
    });
    await movie.save();
    return movie;
  } catch (err) {
    console.error("Error creating movie:", err.message);
    throw new Error("Failed to create movie");
  }
};

// Get all movies from the database
exports.getAllMovie = async () => {
  try {
    const movies = await Movie.find();
    return movies;
  } catch (err) {
    console.error("Error fetching movies:", err.message);
    throw new Error("Failed to fetch movies");
  }
};

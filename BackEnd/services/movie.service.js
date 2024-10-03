const { populate } = require("../models/cast.model");
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

exports.findMovieDetail = async (id) => {
  try {
    let movie = await Movie.findById(id).populate({
      path: 'credit', select: '-_id -__v',
      populate: [
        { path: 'casts', select: '-_id -__v' ,populate:{path: 'person_id',select: '-_id -_v'}},
        { path: 'crews', select: '-_id -__v' ,populate:{path: 'person_id',select: '-_id -_v'}},
        { path: 'production_companies', select: '-_id -__v'}
      ]
    })
      .populate('genres', '-_id -__v')
      .populate('videos', '-_id -__v')
    if (movie) {
      movie.credit.casts=movie.credit.casts.map((cast) => {
        const { person_id, ...rest } = cast; 
        return {
          ...rest,
          ...person_id, 
        };
      })
      movie.credit.crews=movie.credit.crews.map((crew) => {
        const { person_id, ...rest } = crew; 
        return {
          ...rest,
          ...person_id, 
        };
      })
    }
    return movie
  } catch (err) {
    console.log(err.message)
  }
}

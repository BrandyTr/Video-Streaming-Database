const Cast = require("../models/cast.model");
const Credit = require("../models/credit.model");
const Crew = require("../models/crew.model");
const Genre = require("../models/genre.model");
const Movie = require("../models/movie.model");
const Video = require("../models/video.model");
const { getAllMovie, createMovie } = require("../services/movie.service");
const { createOrUpdatePerson } = require("../services/person.service");
const { fetchFromTMDB } = require("../services/tmdb.service")
class MovieController {
  async getAll(req, res) {
    const movies = await getAllMovie()
    res.json(movies)
  }
  async generateMovies(req, res) {
    const { movieName, videoKey } = req.body;
    if (!movieName || !videoKey) {
      return res.status(400).json({
        success: false,
        message: "movieName and videoKey are required!",
      });
    }
  
    try {
      const data = await fetchFromTMDB(
        `https://api.themoviedb.org/3/search/movie?query=${movieName}&include_adult=false&language=en-US&page=1`
      );
      if (data.results.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Not found",
        });
      }
  
      const movieData = data.results[0];
      const movieDetail = await fetchFromTMDB(
        `https://api.themoviedb.org/3/movie/${movieData.id}?append_to_response=credits&language=en-US`
      );
  
      // Handle genres
      const genreIds = await Promise.all(
        movieDetail.genres.map(async (genre) => {
          let existingGenre = await Genre.findOne({ name: genre.name });
          if (!existingGenre) {
            existingGenre = new Genre({ name: genre.name });
            await existingGenre.save();
          }
          return existingGenre._id;
        })
      );
  
      // Create the movie object (save first to get the _id)
      const movie = new Movie({
        title: movieDetail.title,
        overview: movieDetail.overview,
        credit:null,
        release_date: movieDetail.release_date,
        runtime: movieDetail.runtime,
        poster_path: movieDetail.poster_path,
        backdrop_path: movieDetail.backdrop_path,
        genres: genreIds,
        videos:[],
      });
      await movie.save();
  
      // Create cast entries
      const castIds = await Promise.all(
        movieDetail.credits.cast.map(async (castMember) => {
          const person = await createOrUpdatePerson(castMember); // Helper function to create or update a person
          const cast = new Cast({
            person_id: person._id,
            character: castMember.character,
            movie_id: movie._id, // Now movie._id is available
          });
          await cast.save();
          return cast._id;
        })
      );
  
      // Create crew entries
      const crewIds = await Promise.all(
        movieDetail.credits.crew.map(async (crewMember) => {
          const person = await createOrUpdatePerson(crewMember); // Helper function to create or update a person
          const crew = new Crew({
            person_id: person._id,
            movie_id: movie._id, // Now movie._id is available
          });
          await crew.save();
          return crew._id;
        })
      );
  
      // Create the Credit object
      const credit = new Credit({
        casts: castIds,
        crews: crewIds,
      });
  
      await credit.save();
  
      // Create Video
      const video = new Video({
        name: movieDetail.title,
        key: videoKey,
        site: "YouTube",
        published_at: new Date(),
      });
      await video.save();
  
      // Update movie with credit and video information
      movie.credit = credit._id;
      movie.videos.push(video._id);
      await movie.save(); // Save the updated movie
  
      res.status(200).json({
        success: true,
        message: "Movie, credits, and video generated successfully",
      });
    } catch (err) {
      console.log(err.message);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }
  
  async getTrendingMovie(req, res) {
  }
  async getMovieTrailers(req, res) {

  }
  async getMovieDetails(req, res) {

  }
  async getSimilarMovies(req, res) {

  }
  async getMoviesByCategory(req, res) {

  }
}
module.exports = new MovieController()
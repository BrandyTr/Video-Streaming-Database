
const Movie = require("../models/movie.model");
const Video = require("../models/video.model");
const { createCast } = require("../services/cast.service");
const { createProductionCompany } = require("../services/company.service");
const { createCredit } = require("../services/credit.service");
const { createCrew } = require("../services/crew.service");
const { createGenre } = require("../services/genre.service");
const { getAllMovie, createMovie } = require("../services/movie.service");
const { fetchFromTMDB } = require("../services/tmdb.service");
const { createVideo } = require("../services/video.service");
class MovieController {
  async getAll(req, res) {
    try {
      const movies = await getAllMovie()
      res.json({
        success: true,
        content: movies
      })
    } catch (err) {
      res.json({
        success: false,
        message: err.message
      })
    }
  }
  async generateMovies(req, res) {
    const { movieName, videoKey } = req.body;
    if (!movieName || !videoKey) {
      return res.status(400).json({
        success: false,
        message: "movieName and videoKey are required!",
      });
    }
    const result = await generateMovieInfo(movieName, videoKey);
    res.status(result.status).json({
      success: result.success,
      message: result.message
    })
  }
  async deleteMovie(req, res) {
    const movieId = req.params.id
    const result = await deleteMovieById(movieId);

    return res.status(result.status).json({
      success: result.success,
      message: result.message,
    });
  }
  //todo
  async getTrendingMovie(req, res) {
    try {
      // Lấy phim mới ra nha
      const currentDate = new Date();
      const last30Days = new Date();
      last30Days.setDate(currentDate.getDate() - 30);

      // Query
      const TrendingMovies = await Movie.find({
        release_date: { $gte: last30Days }
      }).populate('genres').populate('videos');

      // If no movie
      if (TrendingMovies.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'No trending movies found',
        });
      }
    } catch (err) {
      console.error('Error fetching trending movies: ', err.message);
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch tredning movies'
      });
    }
  }


  async getMovieDetails(req, res) {
    const id = req.params.id
    try {
      const movie = await findMovieDetail(id)
      if (!movie) {
        return res.status(404).json({
          success: false,
          message: "Movie not found"
        })
      }
      res.json({
        success: true,
        content: movie
      })
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message
      })
    }
  }
  async getTopRatedMovies(req, res) {

  }

  async getPopularMovies(req, res) {
    try {
      const popularMovies = await fetchPopularMovies()
      res.status(200).json({
        success: true,
        content: popularMovies
      })
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message
      })
    }
  }

  async getMoviesByCategory(req, res) {

    //todo
  }
  async viewMovie(req, res) {
    const id = req.params.id
    try {
      const movie = await Movie.findById(id)
      if (!movie) {
        return res.status(404).json({
          success: false,
          message: "Movie not found"
        })
      }
      movie.view += 1
      await movie.save()
      res.status(200).json({
        success: true,
        content: movie.view
      })
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message
      })
    }
  }
  //todo
  async getTrendingMovie(req, res) {
  }

  async getMovieDetails(req, res) {

  }

  async getMoviesByCategory(req, res) {

  }
}
module.exports = new MovieController()
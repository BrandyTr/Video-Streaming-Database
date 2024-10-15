
const Movie = require("../models/movie.model");
const Genre = require('../models/genre.model');
const { getAllMovie, findMovieDetail, fetchPopularMovies, generateMovieInfo, deleteMovieById, rateMovie, loveMovie, findMovieByGenre, fetchTopRatedMovies } = require("../services/movie.service");

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
      const last60Days = new Date();
      last60Days.setDate(currentDate.getDate() - 60);

      // Query
      const TrendingMovies = await Movie.find({
        release_date: { $gte: last60Days }
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
    try {
      const topRatedMovies = await fetchTopRatedMovies()
      const limitedTopRatedMovies = topRatedMovies.slice(0, 10);

      res.status(200).json({
        success: true,
        content: limitedTopRatedMovies
      })
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      })
    }
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
    const genreName = req.params.query;
    const result = await findMovieByGenre(genreName)
    const response = {
      success: result.success,
      message: result.message,
    };

    if (result.status === 200 && result.content) {
      response.content = result.content;
    }

    return res.status(result.status).json(response);
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
  async HandleRateMovie(req, res) {
    const id = req.params.id
    const rating = req.body.rating
    const user = req.user
    const result = await rateMovie(id, rating, user._id)
    const response = {
      success: result.success,
      message: result.message,
    };

    if (result.status === 200 && result.content) {
      response.content = result.content;
    }

    return res.status(result.status).json(response);
  }
  async handleLoveMovie(req, res) {
    const id = req.params.id
    const result = await loveMovie(id, req.user._id)
    const response = {
      success: result.success,
      message: result.message,
    };

    if (result.status === 200 && result.content) {
      response.content = result.content;
    }

    return res.status(result.status).json(response);

  }

}
module.exports = new MovieController()
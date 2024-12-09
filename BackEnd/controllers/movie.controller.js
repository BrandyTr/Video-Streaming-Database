const Movie = require("../models/movie.model");
const Genre = require("../models/genre.model");
const {
  getAllMovie,
  findMovieDetail,
  fetchPopularMovies,
  generateMovieInfo,
  deleteMovieById,
  rateMovie,
  loveMovie,
  findMovieByGenre,
  findMoviesByManyGenres,
  fetchTopRatedMovies,
  fetchTrendingMovie,
  testRateMovie,
  filterMovie,
  handleViewMovie,
  ToggleReleaseMovie,
  updateMovie,
} = require("../services/movie.service");

CACHE_EXPIRATION_TIME = 60 * 24 * 60 * 60 * 1000;

class MovieController {
  async getAll(req, res) {
    const limit= req.query.limit
    try {
      const movies = await getAllMovie(limit);
      res.json({
        success: true,
        content: movies,
      });
    } catch (err) {
      res.json({
        success: false,
        message: err.message,
      });
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
      message: result.message,
    });
  }
  async deleteMovie(req, res) {
    const movieId = req.params.id;
    const result = await deleteMovieById(movieId);

    return res.status(result.status).json({
      success: result.success,
      message: result.message,
    });
  }

  async getTrendingMovie(req, res) {
    try {
      const trendingMovies = await fetchTrendingMovie();
      if (trendingMovies.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No trending movies found",
        });
      }

      return res.status(200).json({
        success: true,
        content: trendingMovies,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }

  async getMovieDetails(req, res) {
    const id = req.params.id;
    try {
      const movie = await findMovieDetail(id);
      if (!movie) {
        return res.status(404).json({
          success: false,
          message: "Movie not found",
        });
      }
      res.json({
        success: true,
        content: movie,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
  async getTopRatedMovies(req, res) {
    try {
      const topRatedMovies = await fetchTopRatedMovies();
      res.status(200).json({
        success: true,
        content: topRatedMovies,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }

  async getPopularMovies(req, res) {
    try {
      const popularMovies = await fetchPopularMovies();
      res.status(200).json({
        success: true,
        content: popularMovies,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }

  // async getMoviesByCategory(req, res) {
  //   const genreName = req.params.query;
  //   const result = await findMovieByGenre(genreName);
  //   const response = {
  //     success: result.success,
  //     message: result.message,
  //   };

  //   if (result.status === 200 && result.content) {
  //     response.content = result.content;
  //   }

  //   return res.status(result.status).json(response);
  // }
  async getMoviesByCategory(req, res) {
    const genreNames = req.params.query.split("-"); // Assuming genres are comma-separated
    const result = await findMoviesByManyGenres(genreNames); // Update the function to handle multiple genres
    const response = {
      success: result.success,
      message: result.message,
    };

    if (result.status === 200 && result.content) {
      response.content = result.content;
    }

    return res.status(result.status).json(response);
  }
  async getMovieByOptions(req,res){
    const {genreNames,minRatings}= req.body;
    const options={
      genreNames,
      minRatings:minRatings?minRatings:[]
    }
    const result= await filterMovie(options)
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
    const userId= req.user._id
    const movieId = req.params.id;
    const result= await handleViewMovie(movieId,userId)
    const response = {
      success: result.success,
      message: result.message,
    };

    if (result.status === 200 && result.content) {
      response.content = result.content;
    }

    return res.status(result.status).json(response);
  }
  async HandleRateMovie(req, res) {
    const id = req.params.id;
    const rating = req.body.rating;
    const user = req.user;
    const result = await rateMovie(id, rating, user._id);
    const response = {
      success: result.success,
      message: result.message,
    };

    if (result.status === 200 && result.content) {
      response.content = result.content;
    }

    return res.status(result.status).json(response);
  }
  async HandleUpdateMovie(req,res){
    const bodyUpdate=req.body
    const movieId=req.params.id
    const result = await updateMovie(movieId,bodyUpdate)
    const response = {
      success: result.success,
      message: result.message,
    };

    if (result.status === 200 && result.content) {
      response.content = result.content;
    }

    return res.status(result.status).json(response);
  }
  async HandleTestRateMovie(req, res) {
    const id = req.params.id;
    const rating = req.body.rating;
    const result = await testRateMovie(id, rating);
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
    const id = req.params.id;
    const result = await loveMovie(id, req.user._id);
    const response = {
      success: result.success,
      message: result.message,
    };

    if (result.status === 200 && result.content) {
      response.content = result.content;
    }

    return res.status(result.status).json(response);
  }
  async handleToggleReleasedMovie(req,res){
    const movieId= req.params.id
    const result = await ToggleReleaseMovie(movieId)
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
module.exports = new MovieController();
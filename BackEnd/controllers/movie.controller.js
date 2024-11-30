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
  addMovie,
  updateMovie,
} = require("../services/movie.service");

CACHE_EXPIRATION_TIME = 60 * 24 * 60 * 60 * 1000;

class MovieController {
  async getAll(req, res) {
    try {
      const movies = await getAllMovie();
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
  async viewMovie(req, res) {
    const id = req.params.id;
    try {
      const movie = await Movie.findById(id);
      if (!movie) {
        return res.status(404).json({
          success: false,
          message: "Movie not found",
        });
      }
      movie.view += 1;
      await movie.save();
      res.status(200).json({
        success: true,
        content: movie.view,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
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
  async updateMovie(req, res) {
    const { id } = req.params;
    const updatedMovie = req.body;

    try {
      const result = await Movie.updateMovieById(id, updatedMovie); 

      const response = {
        success: result.success,
        message: result.message,
      };

      if (result.status === 200 && result.content) {
        response.content = result.content;
      }

      return res.status(result.status).json(response);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "An error occurred while updating the movie.",
        error: error.message,
      });
    }
  }
  async addMovie(req, res) {
    try {
      const newMovie = req.body;
      const result = await this.createNewMovie(newMovie); 

      const response = {
        success: result.success,
        message: result.message,
      };

      if (result.status === 201 && result.content) {
        response.content = result.content;
      }

      return res.status(result.status).json(response);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "An error occurred while adding the movie.",
        error: error.message,
      });
    }
  }
  async createNewMovie(movieData) {
    try {
      const movie = new Movie(movieData);
      const savedMovie = await movie.save();

      return {
        success: true,
        message: "Movie added successfully.",
        status: 201,
        content: savedMovie,
      };
    } catch (error) {
      return {
        success: false,
        message: "Failed to add movie.",
        status: 400,
        content: null,
        error: error.message,
      };
    }
  }
  async updateMovieById(id, updatedData) {
    try {
      const updatedMovie = await Movie.findByIdAndUpdate(id, updatedData, {
        new: true, // Returns the updated document
        runValidators: true, // Ensures validation rules are applied
      });

      if (!updatedMovie) {
        return {
          success: false,
          message: "Movie not found.",
          status: 404,
          content: null,
        };
      }

      return {
        success: true,
        message: "Movie updated successfully.",
        status: 200,
        content: updatedMovie,
      };
    } catch (error) {
      return {
        success: false,
        message: "Failed to update movie.",
        status: 400,
        content: null,
        error: error.message,
      };
    }
  }
}
module.exports = new MovieController();

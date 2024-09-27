const Cast = require("../models/cast.model");
const Credit = require("../models/credit.model");
const Crew = require("../models/crew.model");
const Genre = require("../models/genre.model");
const Movie = require("../models/movie.model");
const Video = require("../models/video.model");
const { createCast } = require("../services/cast.service");
const { createCredit } = require("../services/credit.service");
const { createCrew } = require("../services/crew.service");
const { createGenre } = require("../services/genre.service");
const { getAllMovie, createMovie } = require("../services/movie.service");
const { createOrUpdatePerson } = require("../services/person.service");
const { fetchFromTMDB } = require("../services/tmdb.service");
const { createVideo } = require("../services/video.service");
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
    const isSave = await Movie.find({ title: movieName })
    if (isSave.length != 0) {
      return res.status(400).json({
        success: false,
        message: "The movie has already existed"
      })
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
      const trailer = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${movieData.id}/videos?language=en-US`)
      if (trailer.results.length == 0) {
        return res.status(400).json({
          success: false,
          message: "Trailer is not found, you might have to insert trailer manually!"
        })
      }
      const trailerData = trailer.results[0]
      const trailerVideo = await createVideo(
        movieDetail.title,
        trailerData.key,
        trailerData.site,
        "Trailer",
        trailerData.published_at,
      )
      const genreIds = await Promise.all(
        movieDetail.genres.map(async (genre) => {
          let existingGenre = await createGenre(genre.name)
          return existingGenre._id;
        })
      );
      const movie = await createMovie(movieDetail, genreIds, null);
      const castIds = await Promise.all(
        movieDetail.credits.cast
          .filter(castMember => castMember.profile_path)
          .map(async (castMember) => {
            const cast = await createCast(castMember, movie._id)
            return cast._id;
          })
      );

      const crewIds = await Promise.all(
        movieDetail.credits.crew
          .filter(crewMember => crewMember.profile_path)
          .map(async (crewMember) => {
            const crew = await createCrew(crewMember, movie._id)
            return crew._id;
          })
      );

      const credit = await createCredit(
        castIds,
        crewIds,
      );


      const video = createVideo(
        movieDetail.title,
        videoKey,
        "YouTube",
        "full-time",
        trailerData.published_at,
      );

      movie.credit = credit._id;
      movie.videos.push(trailerVideo._id, video._id);
      await movie.save();

      res.status(200).json({
        success: true,
        message: "Movie, credits, and video generated successfully",
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
  async deleteMovie(req, res) {
    const movieId = req.params.id
    try {
      const movie = await Movie.findById(movieId).populate('credit videos');

      if (!movie) {
        return res.status(400).json({
          success: false,
          message: 'Movie not found'
        })
      }

      if (movie.credit) {
        const credit = await Credit.findById(movie.credit._id).populate('casts crews')

        if (credit) {
          await Cast.deleteMany({ _id: { $in: credit.casts } });
          await Crew.deleteMany({ _id: { $in: credit.crews } });
        }

        await Credit.findByIdAndDelete(movie.credit._id);
      }

      if (movie.videos.length > 0) {
        await Video.deleteMany({ _id: { $in: movie.videos } });
      }

      await Movie.findByIdAndDelete(movieId);

      return res.status(200).json({
        success: true,
        message: 'Movie and associated data deleted successfully'
      });

    } catch (err) {
      console.error('Error deleting movie:', err);
      return res.status(500).json({
        success: false,
        message: err.message,
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
const Cast = require("../models/cast.model");
const Credit = require("../models/credit.model");
const Crew = require("../models/crew.model");
const Movie = require("../models/movie.model");
const User = require("../models/user.model");
const Video = require("../models/video.model");
const { createCast } = require("../services/cast.service");
const { createProductionCompany } = require("../services/company.service");
const { createCredit } = require("../services/credit.service");
const { createCrew } = require("../services/crew.service");
const { createGenre } = require("../services/genre.service");
const { getAllMovie, createMovie, findMovieDetail } = require("../services/movie.service");
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

      const productionCompanyIds = await Promise.all(
        movieDetail.production_companies
          .filter(productionCompany => productionCompany.logo_path)
          .map(async productionCompanyItem => {
            const productionCompany = await createProductionCompany(
              productionCompanyItem.name,
              productionCompanyItem.logo_path,
              productionCompanyItem.origin_country
            )
            return productionCompany._id
          })
      )
      const credit = await createCredit(
        castIds,
        crewIds,
        productionCompanyIds,
      );

      const video = await createVideo(
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
        success:true,
        content:movie.view
      })
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message
      })
    }
  }
  async rateMovie(req, res) {
    const id = req.params.id
    const rating = req.body.rating
    if (rating < 0 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 0 and 5"
      })
    }
    
    try {
      const movie = await Movie.findById(id)
      if (!movie) {
        return res.status(404).json({
          success: false,
          message: "Movie not found"
        })
      }
      const userId = req.user._id
      const existingRatingIndex = movie.ratings.findIndex(
        (rating) => rating.userId.toString() === userId.toString()
      )
      if(existingRatingIndex>=0){
        const oldRate=movie.ratings[existingRatingIndex].rate
        movie.ratingSum=movie.ratingSum-oldRate+rating
        movie.ratings[existingRatingIndex].rate=rating
      }else{
        movie.ratings.push({userId,rate:rating})
        movie.ratingSum+=rating
        movie.ratingCount++
      }
      await movie.save()
      res.status(200).json({
        success: true,
        content: {
          "averageRating": movie.averageRating,
          "ratingCount": movie.ratingCount
        },
        message: `Rating updated for movie: ${movie.title}`,
    });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message
      })
    }
  }
  async loveMovie(req, res) {
    const id = req.params.id
    let message
    try {
      const movie = await Movie.findById(id)
      if (!movie) {
        return res.status(404).json({
          success: false,
          message: "Movie not found"
        })
      }
      const user = await User.findById(req.user._id)
      if (!user.favoriteMovies.includes(movie._id)) {
        message = `You love ${movie.title}`
        user.favoriteMovies.push(movie._id)
      } else {
        message = `You unlove ${movie.title}`
        user.favoriteMovies = user.favoriteMovies.filter((movId) => movId.toString() !== movie._id.toString())
      }
      await user.save()

      const { password, ...rest } = user._doc
      return res.status(200).json({
        success: true,
        content: rest,
        message: message,
      })
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message
      })
    }
  }
}
module.exports = new MovieController()
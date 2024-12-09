const Cast = require("../models/cast.model");
const Credit = require("../models/credit.model");
const Crew = require("../models/crew.model");
const Genre = require("../models/genre.model");
const Movie = require("../models/movie.model");
const User = require("../models/user.model");
const Video = require("../models/video.model");
const overViewProjection = require("../utils/projection");
const { createCast } = require("./cast.service");
const { createProductionCompany } = require("./company.service");
const { createCredit } = require("./credit.service");
const { createCrew } = require("./crew.service");
const { createGenre } = require("./genre.service");
const { fetchFromTMDB } = require("./tmdb.service");
const { createVideo } = require("./video.service");
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
      ratingCount: movieDetail.vote_count,
      ratingSum: movieDetail.vote_count * movieDetail.vote_average,
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

exports.generateMovieOphim = async (movieName, videoUrl, OphimYear) => {
  if (!videoUrl) {
    return {
      success: false,
      status: 404,
      message: "No video link provided, try custom link",
    };
  }
  const mongoMovies = await Movie.find({ title: movieName });
  let movieExists = false;
  if (mongoMovies.length != 0) {
    console.log(`${movieName} is checked for duplicating`);
    for (let i = 0; i < mongoMovies.length; i++) {
      if (mongoMovies[i].release_date.getFullYear().toString() == OphimYear) {
        movieExists = true;
        break;
      }
    }
    if (movieExists) {
      return {
        success: false,
        status: 400,
        message: "The movie has already existed",
      };
    }
  }
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/movie?query=${movieName}&include_adult=false&language=en-US&page=1`
    );
    if (data.results.length === 0) {
      return {
        success: false,
        status: 404,
        message: "Not found",
      };
    }
    const tmdbMovies = data.results;
    let movieData = null;
    for (let i = 0; i < tmdbMovies.length; i++) {
      if (tmdbMovies[i].release_date.split("-")[0] == OphimYear) {
        movieData = data.results[i];
        break;
      }
    }
    if (movieData) {
      const movieDetail = await fetchFromTMDB(
        `https://api.themoviedb.org/3/movie/${movieData.id}?append_to_response=credits&language=en-US`
      );
      const trailer = await fetchFromTMDB(
        `https://api.themoviedb.org/3/movie/${movieData.id}/videos?language=en-US`
      );
      if (trailer.results.length == 0) {
        return {
          success: false,
          status: 400,
          message:
            "Trailer is not found, you might have to insert trailer manually!",
        };
      }
      const trailerData = trailer.results[0];
      const trailerVideo = await createVideo(
        movieDetail.title,
        trailerData.key,
        trailerData.site,
        "Trailer",
        trailerData.published_at
      );
      const genreIds = await Promise.all(
        movieDetail.genres.map(async (genre) => {
          let existingGenre = await createGenre(genre.name);
          return existingGenre._id;
        })
      );
      const movie = await exports.createMovie(movieDetail, genreIds, null);
      const castIds = await Promise.all(
        movieDetail.credits.cast
          .filter((castMember) => castMember.profile_path)
          .map(async (castMember) => {
            const cast = await createCast(castMember, movie._id);
            return cast._id;
          })
      );

      const crewIds = await Promise.all(
        movieDetail.credits.crew.map(async (crewMember) => {
          const crew = await createCrew(crewMember, movie._id);
          return crew._id;
        })
      );

      const productionCompanyIds = await Promise.all(
        movieDetail.production_companies
          .filter((productionCompany) => productionCompany.logo_path)
          .map(async (productionCompanyItem) => {
            const productionCompany = await createProductionCompany(
              productionCompanyItem.name,
              productionCompanyItem.logo_path,
              productionCompanyItem.origin_country
            );
            return productionCompany._id;
          })
      );
      const credit = await createCredit(castIds, crewIds, productionCompanyIds);

      const video = await createVideo(
        movieDetail.title,
        videoUrl,
        "Ophim17",
        "full-time",
        trailerData.published_at
      );
      movie.credit = credit._id;
      movie.videos.push(trailerVideo._id, video._id);
      await movie.save();

      return {
        success: true,
        status: 200,
        message: "Movie, credits, and video generated successfully",
      };
    } else {
      return {
        success: false,
        status: 404,
        message: "Can not find Ophim Info in tmdb!",
      };
    }
  } catch (err) {
    return {
      success: false,
      status: 500,
      message: err.message,
    };
  }
};

exports.generateMovieInfo = async (movieName, videoUrl) => {
  const mongoMovies = await Movie.find({ title: movieName });
  if (mongoMovies.length != 0) {
    return {
      success: false,
      status: 400,
      message: "The movie has already existed",
    };
  }
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/movie?query=${movieName}&include_adult=false&language=en-US&page=1`
    );
    if (data.results.length === 0) {
      return {
        success: false,
        status: 404,
        message: "Not found",
      };
    }

    const movieData = data.results[0];
    const movieDetail = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${movieData.id}?append_to_response=credits&language=en-US`
    );
    const trailer = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${movieData.id}/videos?language=en-US`
    );
    if (trailer.results.length == 0) {
      return {
        success: false,
        status: 400,
        message:
          "Trailer is not found, you might have to insert trailer manually!",
      };
    }
    const trailerData = trailer.results[0];
    const trailerVideo = await createVideo(
      movieDetail.title,
      trailerData.key,
      trailerData.site,
      "Trailer",
      trailerData.published_at
    );
    const genreIds = await Promise.all(
      movieDetail.genres.map(async (genre) => {
        let existingGenre = await createGenre(genre.name);
        return existingGenre._id;
      })
    );
    const movie = await exports.createMovie(movieDetail, genreIds, null);
    const castIds = await Promise.all(
      movieDetail.credits.cast
        .filter((castMember) => castMember.profile_path)
        .map(async (castMember) => {
          const cast = await createCast(castMember, movie._id);
          return cast._id;
        })
    );

    const crewIds = await Promise.all(
      movieDetail.credits.crew.map(async (crewMember) => {
        const crew = await createCrew(crewMember, movie._id);
        return crew._id;
      })
    );

    const productionCompanyIds = await Promise.all(
      movieDetail.production_companies
        .filter((productionCompany) => productionCompany.logo_path)
        .map(async (productionCompanyItem) => {
          const productionCompany = await createProductionCompany(
            productionCompanyItem.name,
            productionCompanyItem.logo_path,
            productionCompanyItem.origin_country
          );
          return productionCompany._id;
        })
    );
    const credit = await createCredit(castIds, crewIds, productionCompanyIds);

    const video = await createVideo(
      movieDetail.title,
      videoKey,
      "YouTube",
      "full-time",
      trailerData.published_at
    );

    movie.credit = credit._id;
    movie.videos.push(trailerVideo._id, video._id);
    await movie.save();

    return {
      success: true,
      status: 200,
      message: "Movie, credits, and video generated successfully",
    };
  } catch (err) {
    return {
      success: false,
      status: 500,
      message: err.message,
    };
  }
};
exports.findMovieByGenre = async (genreName) => {
  if (!genreName) {
    return {
      status: 400,
      success: false,
      message: "No genre provided!",
    };
  }
  const genre = await Genre.findOne({
    name: { $regex: genreName, $options: "i" },
  });
  if (!genre) {
    return {
      status: 404,
      success: false,
      message: "Genre not found!!",
    };
  }
};

exports.findMoviesByManyGenres = async (genreNames) => {
  if (!genreNames || genreNames.length === 0) {
    return {
      status: 400,
      success: false,
      message: "No genres provided!",
    };
  }

  try {
    const genres = await Genre.find({
      name: { $in: genreNames.map((name) => new RegExp(name, "i")) },
    });

    if (genres.length !== genreNames.length) {
      return {
        status: 404,
        success: false,
        message: "One or more genres not found!",
      };
    }

    const moviesByGenre = await Promise.all(
      genres.map((genre) =>
        Movie.find({ genres: genre._id }).populate("genres")
      )
    );
    console.log(moviesByGenre);

    const intersectedMovies = moviesByGenre.reduce((acc, genreMovies) => {
      if (!acc) return genreMovies;
      return acc.filter((movie) =>
        genreMovies.some((gm) => gm._id.equals(movie._id))
      );
    }, null);
    if (intersectedMovies) {
      return {
        status: 200,
        success: true,
        message: "Movies retrieved successfully",
        content: intersectedMovies,
      };
    } else {
      return {
        status: 404,
        success: false,
        message: "No movies founded for this filter",
      };
    }
  } catch (error) {
    return {
      status: 500,
      success: false,
      message: "An error occurred while retrieving movies",
    };
  }
};
exports.handleViewMovie = async (movieId, userId) => {
  const user = await User.findById(userId);
  const movie = await Movie.findById(movieId);
  if (!movie) {
    return {
      status: 404,
      success: false,
      message: "Movie not found",
    };
  }
  const index = user.viewHistory.indexOf(movieId);
  if (index !== -1) {
    user.viewHistory.splice(index, 1); // Remove the existing movieId
  }
  movie.view++;
  user.viewHistory.unshift(movieId);
  await movie.save();
  await user.save();
  return {
    status: 200,
    success: true,
  };
};
exports.filterMovie = async (options) => {
  const { genreNames, minRatings } = options;

  try {
    let movies = [];
    let result = [];

    if (genreNames && genreNames.length > 0) {
      const genres = await Genre.find({
        name: { $in: genreNames.map((name) => new RegExp(name, "i")) },
      });

      if (genres.length !== genreNames.length) {
        return {
          status: 404,
          success: false,
          message: "One or more genres not found!",
        };
      }

      const moviesByGenre = await Promise.all(
        genres.map((genre) =>
          Movie.find({ genres: genre._id,isPublished:true }).populate("genres")
        )
      );

      const intersectedMovies = moviesByGenre.reduce((acc, genreMovies) => {
        if (!acc) return genreMovies;
        return acc.filter((movie) =>
          genreMovies.some((gm) => gm._id.equals(movie._id))
        );
      }, null);

      movies = intersectedMovies;
    } else {
      movies = await Movie.find().populate("genres");
    }
    if (minRatings.length > 0) {
      result = movies.filter((movie) =>
        minRatings.some(
          (minRating) =>
            movie.averageRating >= minRating &&
            movie.averageRating < minRating + 1
        )
      );
    } else {
      result = movies;
    }

    if (result.length > 0) {
      return {
        status: 200,
        success: true,
        message: "Movies retrieved successfully",
        content: result,
      };
    } else {
      return {
        status: 200,
        success: true,
        message: "No movies found for this filter",
        content: [],
      };
    }
  } catch (error) {
    return {
      status: 500,
      success: false,
      message: "An error occurred while retrieving movies: ",
    };
  }
};
exports.deleteMovieById = async (movieId) => {
  try {
    const movie = await Movie.findById(movieId).populate("credit videos");

    if (!movie) {
      return {
        success: false,
        status: 400,
        message: "Movie not found",
      };
    }

    if (movie.credit) {
      const credit = await Credit.findById(movie.credit._id).populate(
        "casts crews"
      );

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

    return {
      success: true,
      status: 200,
      message: "Movie and associated data deleted successfully",
    };
  } catch (err) {
    console.error("Error deleting movie:", err);
    return {
      success: false,
      status: 500,
      message: err.message,
    };
  }
};
// Get all movies from the database
exports.getAllMovie = async (limit) => {
  try {
    const movies = await Movie.find({}, overViewProjection).populate("genres").limit(limit);
    return movies;
  } catch (err) {
    console.error("Error fetching movies:", err.message);
    throw new Error("Failed to fetch movies");
  }
};
exports.fetchPopularMovies = async () => {
  try {
    const popularMovies = await Movie.find({isPublished:true}, overViewProjection)
      .populate("genres")
      .sort({ popularity: -1 })
      .limit(15);
    return popularMovies;
  } catch (err) {
    console.error("Error fetching movies:", err.message);
    throw new Error("Failed to fetch popular movies");
  }
};

exports.findMovieDetail = async (id) => {
  try {
    let movie = await Movie.findById(id)
      .populate({
        path: "credit",
        select: "-_id -__v",
        populate: [
          {
            path: "casts",
            select: "-_id -__v",
            populate: { path: "person_id", select: "-_id -_v" },
          },
          {
            path: "crews",
            select: "-_id -__v",
            populate: { path: "person_id", select: "-_id -_v" },
          },
          { path: "production_companies", select: "-_id -__v" },
        ],
      })
      .populate("genres", "-_id -__v")
      .populate("videos", "-_id -__v");
    if (movie) {
      movie.credit.casts = movie.credit.casts.map((cast) => {
        const { person_id, ...rest } = cast;
        return {
          ...rest,
          ...person_id,
        };
      });
      movie.credit.crews = movie.credit.crews.map((crew) => {
        const { person_id, ...rest } = crew;
        return {
          ...rest,
          ...person_id,
        };
      });
    }
    return movie;
  } catch (err) {
    console.error("Error fetching movies:", err.message);
    throw new Error("Failed to fetch popular movies");
  }
};
exports.rateMovie = async (id, rating, userId) => {
  if (rating < 0 || rating > 10) {
    return {
      status: 400,
      success: false,
      message: "Rating must be between 0 and 10",
    };
  }

  try {
    const movie = await Movie.findById(id);
    if (!movie) {
      return {
        status: 404,
        success: false,
        message: "Movie not found",
      };
    }
    const user = await User.findById(userId);
    const existingRatingIndex = user.ratings.findIndex(
      (ratingEntry) => ratingEntry.movieId.toString() === id
    );
    if (existingRatingIndex >= 0) {
      const oldRate = user.ratings[existingRatingIndex].rate;
      movie.ratingSum = movie.ratingSum - oldRate + rating;
      user.ratings[existingRatingIndex].rate = rating;
    } else {
      user.ratings.push({ movieId: movie._id, rate: rating });
      movie.ratingSum += rating;
      movie.ratingCount++;
    }
    await movie.save();
    await user.save();
    return {
      success: true,
      status: 200,
      content: {
        averageRating: movie.averageRating,
        ratingCount: movie.ratingCount,
      },
      message: `Rating updated for movie: ${movie.title}`,
    };
  } catch (err) {
    return {
      status: 500,
      success: false,
      message: err.message,
    };
  }
};
exports.testRateMovie = async (id, rating) => {
  if (rating < 0 || rating > 10) {
    return {
      status: 400,
      success: false,
      message: "Rating must be between 0 and 10",
    };
  }

  try {
    const movie = await Movie.findById(id);
    if (!movie) {
      return {
        status: 404,
        success: false,
        message: "Movie not found",
      };
    }
    movie.ratingSum += rating;
    movie.ratingCount++;
    await movie.save();
    return {
      success: true,
      status: 200,
      content: {
        averageRating: movie.averageRating,
        ratingCount: movie.ratingCount,
      },
      message: `Rating updated for movie: ${movie.title}`,
    };
  } catch (err) {
    return {
      status: 500,
      success: false,
      message: err.message,
    };
  }
};
exports.fetchTrendingMovie = async () => {
  const currentTime = new Date().getTime();
  const movies = await Movie.find({isPublished:true}, overViewProjection)
    .populate("genres")
    .sort({ release_date: -1 })
    .limit(15);
  lastUpdatedTime = currentTime;
  return movies;
};
exports.fetchTopRatedMovies = async () => {
  try {
    const allMovies = await Movie.find({isPublished:true}, overViewProjection).populate(
      "genres"
    );
    allMovies.sort((a, b) => b.averageRating - a.averageRating);

    // Limit the result to 15 movies
    return (topRatedMovies = allMovies.slice(0, 15));
  } catch (err) {
    throw new Error(err.message);
  }
};
exports.updateMovie= async(movieId, bodyUpdate)=>{
  try{
    const result = await Movie.findByIdAndUpdate(movieId,bodyUpdate,{new:true})
    return{
      status:200,
      success:true,
      content:result
    }
  }catch(err){
    return{
      status:500,
      success:false,
      message:err.message
    }
  }
}
exports.loveMovie = async (movieId, userId) => {
  try {
    let message;
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return {
        status: 404,
        success: false,
        message: "Movie not found",
      };
    }
    const user = await User.findById(userId);
    if (!user.favoriteMovies.includes(movie._id)) {
      message = `You love ${movie.title}`;
      user.favoriteMovies.push(movie._id);
      movie.favoriteCount++;
    } else {
      message = `You unlove ${movie.title}`;
      user.favoriteMovies = user.favoriteMovies.filter(
        (movId) => movId.toString() !== movie._id.toString()
      );
      movie.favoriteCount--;
    }
    await movie.save();
    await user.save();

    const { password, ...rest } = user._doc;
    return {
      status: 200,
      success: true,
      content: rest,
      message: message,
    };
  } catch (err) {
    return {
      status: 500,
      success: false,
      message: err.message,
    };
  }
};
exports.ToggleReleaseMovie = async (movieId) => {
  try {
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return {
        success: false,
        status: 404,
        message: "Movie not found",
      };
    }
    movie.isPublished = !movie.isPublished;
    await movie.save();
    return {
      status: 200,
      success: true,
      content: movie,
    };
  } catch (err) {
    return {
      status: 500,
      success: false,
      message: err.message,
    };
  }
};
exports.releasedManyMovies = async (MovieIds) => {
  try {
    if (!MovieIds || MovieIds.length === 0) {
      return {
        success: false,
        status: 400,
        message: "No movie IDs provided",
      };
    }
    const movies = await Movie.find({ _id: { $in: MovieIds } });
    if (!movies || movies.length === 0) {
      return {
        success: false,
        status: 404,
        message: "No movies found for the provided IDs",
      };
    }
    movies.forEach(async (movie) => {
      (movie.isPublished = true), await movie.save();
    });
  } catch (err) {
    return {
      status: 500,
      success: false,
      message: err.message,
    };
  }
};


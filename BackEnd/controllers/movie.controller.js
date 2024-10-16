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
} = require("../services/movie.service");
CACHE_EXPIRATION_TIME = 60 * 24 * 60 * 60 * 1000; // 60 days in milliseconds
lastUpdatedTime = null;
cachedTrendingMovies = null;

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
			const currentTime = new Date().getTime();

			if (
				!lastUpdatedTime ||
				currentTime - lastUpdatedTime > CACHE_EXPIRATION_TIME
			) {
				const projection = {
					title: 1,
					overview: 1,
					poster_path: 1,
					backdrop_path: 1,
				};

				// Fetch the top 15 latest movies sorted by release date (descending)
				cachedTrendingMovies = await Movie.find({}, projection)
					.sort({ release_date: -1 })
					.limit(15);

				// Remove unwanted fields like averageRating, popularity, and id
				cachedTrendingMovies = cachedTrendingMovies.map((movie) => {
					const { averageRating, popularity, id, ...rest } = movie.toObject();
					return rest;
				});

				lastUpdatedTime = currentTime;
			}

			if (cachedTrendingMovies.length === 0) {
				return res.status(404).json({
					success: false,
					message: "No trending movies found",
				});
			}

			return res.status(200).json({
				success: true,
				data: cachedTrendingMovies,
			});
		} catch (err) {
			console.error("Error fetching trending movies: ", err.message);
			return res.status(500).json({
				success: false,
				message: "Failed to fetch trending movies",
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
	async getTopRatedMovies(req, res) {}

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

	async getMoviesByCategory(req, res) {
		const genreName = req.params.query;
		const result = await findMovieByGenre(genreName);
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
}
module.exports = new MovieController();

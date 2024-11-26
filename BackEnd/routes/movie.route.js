const express= require('express')
const MovieController= require('../controllers/movie.controller')
const { adminRoute } = require('../middleware/protectRoute')
const router=express.Router()
router.get("/trending",MovieController.getTrendingMovie)
router.get("/popular",MovieController.getPopularMovies)
router.get("/all",MovieController.getAll)
router.patch("/:id/view",MovieController.viewMovie)
router.patch("/:id/rate",MovieController.HandleRateMovie)
router.post("/:id/rate",MovieController.HandleTestRateMovie)
router.delete("/:id/delete",adminRoute,MovieController.deleteMovie)
router.post("/create",MovieController.generateMovies)
router.post("/:id/favorite",MovieController.handleLoveMovie)
router.get("/:id/details",MovieController.getMovieDetails)
// router.get("/:query/category", MovieController.getMoviesByCategory);
router.get("/:query/category", MovieController.getMoviesByCategory);
router.get("/top-rated", MovieController.getTopRatedMovies)
module.exports=router

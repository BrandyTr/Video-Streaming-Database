const express= require('express')
const MovieController=require('../controllers/movie.controller')
const router=express.Router()
router.get("/trending",MovieController.getTrendingMovie)
router.get("/popular",MovieController.getPopularMovies)
router.get("/all",MovieController.getAll)
router.patch("/:id/view",protectRoute,MovieController.viewMovie)
router.patch("/:id/rate",protectRoute,MovieController.HandleRateMovie)
router.delete("/:id/delete",MovieController.deleteMovie)
router.post("/create",MovieController.generateMovies)
router.post("/:id/favorite",protectRoute,MovieController.handleLoveMovie)
router.get("/:id/details",MovieController.getMovieDetails)
router.get("/:query", MovieController.getMoviesByCategory);
module.exports=router

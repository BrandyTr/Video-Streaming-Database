const express= require('express')
const MovieController= require('../controllers/movie.controller')
const router=express.Router()
router.get("/trending",MovieController.getTrendingMovie)
router.get("/all",MovieController.getAll)
router.delete("/delete/:id",MovieController.deleteMovie)
router.post("/create",MovieController.generateMovies)
router.get("/:id/details",MovieController.getMovieDetails)
router.get("/:query", MovieController.getMoviesByCategory);
module.exports=router

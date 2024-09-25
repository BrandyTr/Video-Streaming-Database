const { getAllMovie } = require("../services/movie.service")
const { fetchFromTMDB } = require("../services/tmdb.service")

class MovieController{
    async getAll(req,res){
        getAllMovie(req,res)
    }
    async getTrendingMovie(req,res){
    }
    async getMovieTrailers(req,res){
    
    }
    async getMovieDetails(req,res){
  
    }
    async getSimilarMovies(req,res){

    }
    async getMoviesByCategory(req,res){
 
    }
}
module.exports=new MovieController()
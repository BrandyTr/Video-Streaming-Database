const User = require("../models/user.model")
const { fetchFromTMDB } = require("../services/tmdb.service")

class SearchController{
    async searchPerson(req,res){
    
    }
    async searchMovie(req,res){
       
    }
    async searchTv(req,res){
        
    }
    async getSearchHistory(req,res){

    }
    async removeItemFromSearchHistory(req,res){

    }
}
module.exports=new SearchController()
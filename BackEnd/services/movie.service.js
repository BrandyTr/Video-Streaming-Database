const Movie = require("../models/movie.model");
const mongoose=require('mongoose');
const Video = require("../models/video.model");
const Genre = require("../models/genre.model");
exports.createMovie=async(title, overview, release_date, runtime, genres, production_companies, videos)=> {
    const movie = new Movie({
      title: title,  // Pass title as a parameter
      overview: overview,  // Pass overview as a parameter
      release_date: new Date(release_date),  // Convert release_date to Date
      runtime: runtime,  // Pass runtime as a parameter
      genres: genres,  // Pass genres as a parameter (array of Genre ObjectIds)
      production_companies: production_companies,  // Pass production_companies as a parameter (array of ProductionCompany ObjectIds)
      videos: videos,  // Pass videos as a parameter (array of Video ObjectIds)
    });
    try{
        await movie.save()
    }catch(err){
        console.log(err)
    }
}
exports.getAllMovie=async(req,res)=>{
    try{
        const movies= await Movie.find().populate('videos').populate('genres')
        res.json(movies)
    }catch(err){
        console.log(err.message)
    }
}

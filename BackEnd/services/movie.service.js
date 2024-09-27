const Movie = require("../models/movie.model");
const mongoose=require('mongoose');
const Video = require("../models/video.model");
const Genre = require("../models/genre.model");
exports.createMovie=async(title, overview, release_date, runtime,poster_path,backdrop_path,credit, genres, videos)=> {
    const movie = new Movie({
      title: title,  
      overview: overview, 
      release_date: new Date(release_date),  
      runtime: runtime,  
      poster_path,
      backdrop_path,
      credit,
      genres: genres,  
      videos: videos,  
    });
    try{
        await movie.save()
        return movie
    }catch(err){
        console.log(err)
    }
}
exports.getAllMovie=async()=>{
    try{
        const movies= await Movie.find()
        return movies
    }catch(err){
        console.log(err.message)
    }
}

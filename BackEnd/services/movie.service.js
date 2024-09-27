const Movie = require("../models/movie.model");
exports.createMovie = async (movieDetail, genreIds, creditId, videoId) => {
    const movie = new Movie({
      title: movieDetail.title,
      overview: movieDetail.overview,
      release_date: movieDetail.release_date,
      runtime: movieDetail.runtime,
      poster_path: movieDetail.poster_path,
      backdrop_path: movieDetail.backdrop_path,
      genres: genreIds,
      credit: creditId,
      videos: [videoId],
    });
    await movie.save();
    return movie;
  };
exports.getAllMovie=async()=>{
    try{
        const movies= await Movie.find()
        return movies
    }catch(err){
        console.log(err.message)
    }
}

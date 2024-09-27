const Genre= require('../models/genre.model')
exports.createGenre=async(name)=>{
    let genre = await Genre.findOne({ name: genreName });
    if (!genre) {
      genre = new Genre({ name: genreName });
      await genre.save();
    }
    return genre._id;
}
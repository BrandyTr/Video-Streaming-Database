const mongoose = require('mongoose')
const Schema = mongoose.Schema
const CastSchema = new Schema({
    person_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Person' },  // Reference to Person
    character: String,  // Name of the character in the movie or TV show
    movie_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },  // Optional if TV show
    tv_show_id: { type: mongoose.Schema.Types.ObjectId, ref: 'TVShow' },  // Optional if Movie
});

const Cast = mongoose.model('Cast', CastSchema);
module.exports = Cast;

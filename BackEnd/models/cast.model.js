const mongoose = require('mongoose')
const Schema = mongoose.Schema
const CastSchema = new Schema({
    person_id: { type: Schema.Types.ObjectId, ref: 'Person',required:true }, 
    character: String, 
    movie_id: { type: Schema.Types.ObjectId, ref: 'Movie', required:true }, 
    // tv_show_id: { type: mongoose.Schema.Types.ObjectId, ref: 'TVShow' },  
});

const Cast = mongoose.model('Cast', CastSchema);
module.exports = Cast;

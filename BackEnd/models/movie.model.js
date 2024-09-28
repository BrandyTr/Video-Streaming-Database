const mongoose = require('mongoose')
const Schema = mongoose.Schema
const MovieSchema = new Schema({
    title: { type: String, required: true },
    overview: { type: String, required: true },
    release_date: {type:Date,required:true},
    runtime: {type:Number,required:true},
    poster_path: {type:String,required:true},
    backdrop_path: {type:String,required:true},
    credit:{type:Schema.Types.ObjectId,ref:'Credit'},
    genres: [{ type: Schema.Types.ObjectId, ref: 'Genre' }],  // Many-to-many
    videos: [{ type: Schema.Types.ObjectId, ref: 'Video',default:[] }],  // One-to-many
});

const Movie = mongoose.model('Movie', MovieSchema);
module.exports = Movie;

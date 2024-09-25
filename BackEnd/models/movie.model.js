const mongoose = require('mongoose')
const Schema = mongoose.Schema
const MovieSchema = new Schema({
    title: { type: String, required: true },
    overview: { type: String, required: true },
    release_date: {type:Date,required:true},
    runtime: {type:Number,required:true},
    poster_path: {type:String,required:true},
    backdrop_path: {type:String,required:true},
    // Relationships
    genres: [{ type: Schema.Types.ObjectId, ref: 'Genre' }],  // Many-to-many
    production_companies: [{ type: Schema.Types.ObjectId, ref: 'ProductionCompany' ,default:[]}],  // Many-to-many
    casts: [{ type: Schema.Types.ObjectId, ref: 'Cast',default:[] }],  // One-to-many
    crews: [{ type: Schema.Types.ObjectId, ref: 'Crew',default:[] }],  // One-to-many
    videos: [{ type: Schema.Types.ObjectId, ref: 'Video',default:[] }],  // One-to-many
});

const Movie = mongoose.model('Movie', MovieSchema);
module.exports = Movie;

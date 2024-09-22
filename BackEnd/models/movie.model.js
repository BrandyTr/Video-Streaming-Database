const mongoose = require('mongoose')
const Schema = mongoose.Schema
const MovieSchema = new Schema({
    title: { type: String, required: true },
    overview: String,
    release_date: Date,
    runtime: Number,
    poster_path: String,
    backdrop_path: String,
    // Relationships
    genres: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Genre' }],  // Many-to-many
    production_companies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ProductionCompany' }],  // Many-to-many
    casts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cast' }],  // One-to-many
    crews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Crew' }],  // One-to-many
    videos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }],  // One-to-many
});

const Movie = mongoose.model('Movie', MovieSchema);
module.exports = Movie;

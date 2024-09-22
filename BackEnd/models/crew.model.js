const mongoose=require('mongoose')
const Schema=mongoose.Schema
const CrewSchema = new Schema({
    person_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Person' },  // Reference to Person
    job: String,  // Job title (e.g., "Director", "Producer")
    department: String,  // Department (e.g., "Directing", "Production")
    movie_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },  // Optional if TV show
    tv_show_id: { type: mongoose.Schema.Types.ObjectId, ref: 'TVShow' },  // Optional if Movie
  });
  
  const Crew = mongoose.model('Crew', CrewSchema);
  module.exports = Crew;
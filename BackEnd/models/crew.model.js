const mongoose=require('mongoose')
const Schema=mongoose.Schema
const CrewSchema = new Schema({
    person_id: { type: Schema.Types.ObjectId, ref: 'Person' },  
    movie_id: { type: Schema.Types.ObjectId, ref: 'Movie' }, 
    // tv_show_id: { type: mongoose.Schema.Types.ObjectId, ref: 'TVShow' }, 
  });
  
  const Crew = mongoose.model('Crew', CrewSchema);
  module.exports = Crew;
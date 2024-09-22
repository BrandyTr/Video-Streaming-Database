
const mongoose=require('mongoose')
const Schema=mongoose.Schema
const GenreSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
});

const Genre = mongoose.model('Genre', GenreSchema);
module.exports = Genre;

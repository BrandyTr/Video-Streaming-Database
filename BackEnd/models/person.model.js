const mongoose = require('mongoose')
const Schema = mongoose.Schema
const PersonSchema = Schema({
    name: { type: String, required: true },
    biography: String,
    birthday: Date,
    deathday: Date,
    place_of_birth: String,
    profile_path: String,
    known_for_department: String,
});

const Person = mongoose.model('Person', PersonSchema);
module.exports = Person;

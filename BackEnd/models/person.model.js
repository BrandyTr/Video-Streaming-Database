const mongoose = require('mongoose')
const Schema = mongoose.Schema
const PersonSchema = Schema({
    name: { type: String, required: true },
    biography: String,
    profile_path: String,
});

const Person = mongoose.model('Person', PersonSchema);
module.exports = Person;

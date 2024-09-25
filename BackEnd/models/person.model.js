const mongoose = require('mongoose')
const Schema = mongoose.Schema
const PersonSchema = Schema({
    name: { type: String, required: true },
    biography: { type: String, required: true },
    profile_path: { type: String, required: true },
});

const Person = mongoose.model('Person', PersonSchema);
module.exports = Person;

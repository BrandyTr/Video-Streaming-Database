const mongoose = require('mongoose')
const Schema = mongoose.Schema
const PersonSchema = Schema({
    name: { type: String, required: true },
    known_for_department:{type:String, default:null},
    job:{type:String,default:"Actor"},
    profile_path: { type: String, default:null },
});

const Person = mongoose.model('Person', PersonSchema);
module.exports = Person;

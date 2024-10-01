const User = require("../models/user.model")
const { fetchFromTMDB } = require("../services/tmdb.service")
const Person = require('../models/person.model')
class SearchController {
    async searchPerson(req, res) {
        const name =req.query.name
        if(!name){
            return res.status(400).json({success:false,message:"No name provided!"})
        }
        try {
            const persons = await Person.find({
                name:{$regex: name,$options:'i'}
            })
            res.json({ success: true, content: persons })
        } catch (err) {
            res.status(400).json({ success: false, message: err.message })
        }
    }
    async searchMovie(req, res) {

    }
    async searchTv(req, res) {

    }
    async getSearchHistory(req, res) {

    }
    async removeItemFromSearchHistory(req, res) {

    }
}
module.exports = new SearchController()
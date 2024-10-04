const User = require("../models/user.model")
const { fetchFromTMDB } = require("../services/tmdb.service")
const Person = require('../models/person.model')
const Movie = require('../models/movie.model')
class SearchController {
    async searchPerson(req, res) {
        const name = req.query.name
        if (!name) {
            return res.status(400).json({ success: false, message: "No name provided!" })
        }
        try {
            const persons = await Person.find({
                name: { $regex: name, $options: 'i' }
            })
            await User.findByIdAndUpdate(req.user._id, {
                searchHistory:{
                    query: name,
                    searchType: "person",
                    createdAt: new Date()
                } 
            })
            res.json({ success: true, content: persons })
        } catch (err) {
            res.status(400).json({ success: false, message: err.message })
        }
    }
    async searchMovie(req, res) {
        const title = req.query.name
        if (!title) {
            return res.status(400).json({ success: false, message: "No title provided!" })
        }
        try {
            const movies = await Movie.find({
                title: { $regex: title, $options: 'i' }
            })
            await User.findByIdAndUpdate(req.user._id, {
                $push: {
                    searchHistory:{
                        query: title,
                        searchType: "movie",
                        createdAt: new Date()
                    } 
                }
            })

            return res.json({ success: true, content: movies });
        } catch (err) {
            return res.status(400).json({ success: false, message: err });
        }
    }
    async searchTv(req, res) {

    }
    async getSearchHistory(req, res) {

    }
    async removeItemFromSearchHistory(req, res) {

    }
}
module.exports = new SearchController()
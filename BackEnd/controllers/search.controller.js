const User = require("../models/user.model")
const { fetchFromTMDB } = require("../services/tmdb.service")
const Person = require('../models/person.model')
const Movie = require('../models/movie.model')
const ProductionCompany = require('../models/productionCompany')
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
        const adminOption={
            title: { $regex: title, $options: 'i' },
        }
        const userOption={
            title: { $regex: title, $options: 'i' },
            isPublished:true
        }
        if (!title) {
            return res.status(400).json({ success: false, message: "No title provided!" })
        }
        try {
            let movies=[]
            if(req.user.role=='admin'){
                movies = await Movie.find(adminOption)
            }else{
                movies= await Movie.find(userOption)
            }
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
            return res.status(400).json({ success: false, message: err.message });
        }
    }
    async searchProductionCompany(req, res) {
        const name = req.query.name
        if (!name) {
            return res.status(400).json({ success: false, message: "No name provided!" })
        }
        try {
            const companies = await ProductionCompany.find({
                name: { $regex: name, $options: 'i' } 
            })
    
            await User.findByIdAndUpdate(req.user._id, {
                $push: {
                    searchHistory: {
                        query: name,
                        searchType: "productionCompany",
                        createdAt: new Date()
                    }
                }
            })
    
            res.json({ success: true, content: companies })
        } catch (err) {
            res.status(400).json({ success: false, message: err.message })
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
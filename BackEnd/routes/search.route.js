const express= require('express')
const SearchController=require('../controllers/search.controller')
const router=express.Router()
router.get("/person",SearchController.searchPerson)
router.get("/movie",SearchController.searchMovie)
router.get("/tv/:query",SearchController.searchTv)
router.get('/history',SearchController.getSearchHistory)
router.delete('/history/:id',SearchController.removeItemFromSearchHistory)
module.exports=router
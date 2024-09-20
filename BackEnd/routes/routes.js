const { protectRoute } = require('../middleware/protectRoute')
const authRoutes= require('./auth.route')
const movieRoutes= require('./movie.route')
const tvRoutes=require('./tv.route')
const searchRoutes=require('./search.route')
function Routes(app){
    app.use('/api/auth',authRoutes)
    app.use('/api/movie',movieRoutes)
    app.use('/api/tv',tvRoutes)
    app.use('/api/search',searchRoutes)
}
module.exports=Routes
const dotenv =require('dotenv')
dotenv.config()
const ENV_VARS={
    MONGO_URI:process.env.MONGO_URI,
    PORT: process.env.PORT||3001,
    JWT_SECRET:process.env.JWT_SECRET,
    MODE:process.env.MODE,
    TMDB_API_KEY:process.env.TMDB_API_KEY,
    GOOGLE_CLIENT_ID:process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET:process.env.GOOGLE_CLIENT_SECRET
}
module.exports=ENV_VARS
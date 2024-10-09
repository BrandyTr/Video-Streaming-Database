const express= require('express')
const Routes= require('./routes/routes')
var cors = require('cors')
const {initMovies,movieList,loadOphimMovies}=require('./config/init')
const ENV_VARS = require('./config/vars')
const db=require('./config/db')
const cookieParser = require('cookie-parser')
const app=express()
const port=ENV_VARS.PORT
db.connect()
// app.use(cors({
//     origin: 'http://localhost:5173',  // Specify the frontend URL here
//     credentials: true  // Allow credentials (cookies, authorization headers, etc.)
//   }));
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
Routes(app)
app.listen(port,()=>{
    console.log(`Server started at port ${port}`)
})
loadOphimMovies(30)
//czJMSeHQEl6MeBie
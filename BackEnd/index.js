const express= require('express')
const Routes= require('./routes/routes')
const {loadOphimMovies}=require('./config/init')
const ENV_VARS = require('./config/vars')
const db=require('./config/db')
const cookieParser = require('cookie-parser')
const app=express()
const port=ENV_VARS.PORT
db.connect()
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
Routes(app)
app.listen(port,()=>{
    console.log(`Server started at port ${port}`)
})
loadOphimMovies(100)
//czJMSeHQEl6MeBie
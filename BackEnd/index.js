const express= require('express')
const Routes= require('./routes/routes')
const {loadOphimMovies}=require('./config/init')
const ENV_VARS = require('./config/vars')
const db=require('./config/db')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const passport = require('passport')
const app=express()
const port=ENV_VARS.PORT
const GoogleStrategy = require( 'passport-google-oauth20' ).Strategy;
db.connect()
app.use(session({
    secret:"secret",
    resave:false,
    saveUninitialized:true,
}))
app.use(passport.initialize())
app.use(passport.session())
passport.use(new GoogleStrategy({
    clientID:ENV_VARS.GOOGLE_CLIENT_ID,
    clientSecret:ENV_VARS.GOOGLE_CLIENT_SECRET,
    callbackURL:'http://localhost:3000/api/auth/google/callback',
},(accessToken,refreshToken,profile,done)=>{
    profile.accessToken = accessToken;
    return done(null, profile);
}))
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
passport.serializeUser((user,done)=>done(null, { profile: user, accessToken: user.accessToken }))
passport.deserializeUser((sessionData,done)=>done(null,sessionData))
Routes(app)
app.get("/",(req,res)=>{
    res.send("<a href='api/auth/google'>Login with Google</a>");
})
// app.get("/auth/google",passport.authenticate('google',{scope:['profile','email']}));
// app.get("/auth/google/callback",passport.authenticate('google',{failureRedirect:"/"}),(req,res)=>{
//     res.redirect('/profile')
// })
// app.get('/profile',(req,res)=>{
//     console.log('Google Token:', req.user.accessToken);
//     res.send('ok')
// })
// app.get('/logout',(req,res)=>{
//     req.logOut(err=>res.redirect('/'));
//     res.redirect('/')
// })
app.listen(port,()=>{
    console.log(`Server started at port ${port}`)
})
loadOphimMovies(30)
//czJMSeHQEl6MeBie
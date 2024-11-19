
const { generateToken } = require("../utils/generateToken")
const passport = require('passport');
const { default: axios } = require("axios");
const { signup, login } = require("../services/auth.service");
class authController {
    googleAuth= passport.authenticate('google', { scope: ['profile', 'email'] });

    googleAuthCallBack= passport.authenticate('google',{failureRedirect:"/"})

    googleAuthCallBackNext(req,res){
        const {name,picture,email}=req.user._json
        const googlePayload={
            username:name,
            email,
            image:picture
        }
        console.log(req.user._json)
        axios.post('/api/auth/login',googlePayload)
        res.send('ok')
    }
    async signup(req, res, next) {
        try {
            const { email, password, username } = req.body;
            const newUser = await signup(email, password, username);

            generateToken(newUser._id, res);

            res.status(201).json({
                success: true,
                message: "Successfully created",
                user: {
                    ...newUser._doc,
                    password: ""
                }
            });
        } catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }

    }
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await login(email, password);

            generateToken(user._id, res);

            res.status(200).json({
                success: true,
                message: "Successfully logged in",
                user: {
                    ...user._doc,
                    password: ""
                }
            });
        } catch (err) {
            if (err.message === "Invalid credentials" || err.message === "All fields are required!") {
                res.status(400).json({ success: false, message: err.message });
            } else {
                res.status(500).json({ success: false, message: "Internal server error" });
            }
        }
    }
    async logout(req, res, next) {
        try{
            res.clearCookie("jwt")
            res.status(200).json({
                success:true,
                message:"Logged out successfully"
            })
        }catch(err){
            res.status(500).json({
                success:false,
                message:"Internal server error"
            })

            next(err)
        }
    }
    async authCheck(req,res){
        try{
            res.status(200).json({sucess:true,user:req.user})
        }catch(err){
            console.log(err.message)
        }
    }
}
module.exports = new authController()
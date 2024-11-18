const User = require("../models/user.model")
const bcryptjs = require('bcryptjs')
const { generateToken } = require("../utils/generateToken")
class authController {
    async signup(req, res, next) {
        try {
            const { email, password, username } = req.body
            if (!email || !password || !username) {
                return res.status(400).json({ success: false, message: "All fields are required!" })
            }
            const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
            if (!emailRegex.test(email)) {
                return res.status(400).json({ success: false, message: "Invalid email!" })
            }
            if (password.length < 6) {
                return res.status(400).json({ success: false, message: "Password must bt at least 6 characters!" })
            }
            const existingUserByEmail = await User.findOne({ email })
            if (existingUserByEmail) {
                return res.status(400).json({ success: false, message: "Email have already existed!" })
            }
            const existingUserByUsername = await User.findOne({ username })
            if (existingUserByUsername) {
                return res.status(400).json({ success: false, message: "Username have already existed!" })
            }
            const PROFILES = ["avatar1.png", "avatar2.png", "avatar3.png"]
            const image = PROFILES[Math.floor(Math.random() * PROFILES.length)]
            const salt = await bcryptjs.genSalt(10)
            const hashPassword = await bcryptjs.hash(password, salt)
            const newUser = new User(
                {
                    email,
                    password: hashPassword,
                    username,
                    image,
                }
            )

            generateToken(newUser._id, res)
            await newUser.save()
            res.status(201).json({
                success: true, message: "Sucessfully created", user: {
                    ...newUser._doc,
                    password: ''
                }
            })

        }
        catch (err) {
            next(err)
        }

    }
    async login(req, res, next) {
        try{
            const {email,password}=req.body
            if(!email||!password){
                return res.status(400).json({
                    success:false,
                    message:"All fields are required!",
                })
            }
            const user =await User.findOne({email})
            if(!user){
                return res.status(400).json({
                    success:false,
                    message:"Invalid credentials"
                })
            }
            const isCorrect=await bcryptjs.compare(password,user._doc.password)
            if(!isCorrect){
                return res.status(400).json({
                    success:false,
                    message:"Invalid credentials"
                })
            }
            generateToken(user._id,res)
            res.status(200).json({
                success: true, message: "Sucessfully login", user: {
                    ...user._doc,
                    password: ''
                }
            })
        }catch(err){
            res.status(500).json({
                success:false,
                message:"Internal server error"
            })
            next(err)
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
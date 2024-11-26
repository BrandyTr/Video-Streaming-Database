
const { generateToken } = require("../utils/generateToken")
const { signup, login } = require("../services/auth.service");
class authController {
    async signup(req, res, next) {
        try {
            const { email, password, username,role } = req.body;
            const newUser = await signup(email, password, username,role);

            generateToken(newUser._id,newUser.role, res);

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
            const { email, password, username, image, isGoogleLogin } = req.body;
            const user = await login( email, password, username, image, isGoogleLogin )

            generateToken(user._id,user.role, res);

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
                console.log(err)
                res.status(500).json({ success: false, message: err.message });
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
const authService = require("../services/auth.service");
const { generateToken } = require("../utils/generateToken");
class authController {
    async signup(req, res, next) {
        try {
            const { email, password, username } = req.body;
            const newUser = await authService.signup(email, password, username);

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
    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const user = await authService.login(email, password);

            // Generate token upon successful login
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
                // Handle unexpected server errors
                res.status(500).json({ success: false, message: "Internal server error" });
            }
            next(err);
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
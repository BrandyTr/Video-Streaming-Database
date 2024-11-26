const jwt= require('jsonwebtoken')
const vars=require('../config/vars')
exports.generateToken=(userId,role,res)=>{
    const token=jwt.sign({userId,role},vars.JWT_SECRET,{expiresIn:"2h"})
    res.cookie("jwt",token,{
        maxAge:2*60*60*1000,
        httpOnly:true,
        sameSite:"strict",
        secure:vars.MODE!=="development",
    })
    return token;
}

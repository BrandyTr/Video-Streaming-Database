const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const vars = require("../config/vars");
const overViewProjection = require("../utils/projection");
exports.protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - No token provided",
      });
    }
    const decoded = jwt.verify(token, vars.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - Invalid token!",
      });
    }
    const user = await User.findById(decoded.userId).populate('ratings',overViewProjection).populate('viewHistory',overViewProjection).populate('searchHistory',overViewProjection);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    req.user = user;
    next();
  } catch (err) {
    console.log("err in protecting route: ", err.message);
    res.status(500).json({
      sucess: false,
      message: "Internal Server Error",
    });
  }
};
exports.adminRoute = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ success:false,message: "Access denied: Admins only" });
  }
  next();
};

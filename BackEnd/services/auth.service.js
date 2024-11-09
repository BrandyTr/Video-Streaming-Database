const User = require("../models/user.model");
const bcryptjs = require("bcryptjs");
exports.signup = async (email, password, username) => {
    if (!email || !password || !username) {
      throw new Error("All fields are required!");
    }
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (!emailRegex.test(email)) {
      throw new Error("Invalid email!");
    }
    if (password.length < 6) {
      throw new Error("Password must bt at least 6 characters!");
    }
    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      throw new Error("Email have already existed!");
    }
    const existingUserByUsername = await User.findOne({ username });
    if (existingUserByUsername) {
      throw new Error("Username have already existed!");
    }
    const PROFILES = ["avatar1.png", "avatar2.png", "avatar3.png"];
    const image = PROFILES[Math.floor(Math.random() * PROFILES.length)];
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);
    const newUser = new User({
      email,
      password: hashPassword,
      username,
      image,
    });

    await newUser.save();
    return newUser;

};
exports.login = async (email, password) => {
  if (!email || !password) {
    throw new Error("All fields are required!");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid credentials");
  }
  const isCorrect = await bcryptjs.compare(password, user.password);
  if (!isCorrect) {
    throw new Error("Invalid credentials");
  }

  return user;
};

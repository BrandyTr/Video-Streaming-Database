const User = require("../models/user.model");
const bcryptjs = require("bcryptjs");
class UserController {
  async editProfile(req, res) {
    const userId = req.user._id;
    const { username, email, currentPassword, newPassword } = req.body;
    const image = req.file;
    const user = await User.findById(userId);
    if (!username && !currentPassword && !image) {
      return res.status(400).json({
        success: false,
        message: "No changes provided",
      });
    }
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    if (username) {
      const isUserNameExisted = await User.findOne({ username });
      if (isUserNameExisted) {
        return res.status(400).json({
          success: false,
          message: "Username has already existed!",
        });
      }
      user.username = username;
    }
    if (currentPassword && newPassword) {
        if(newPassword.length<6){
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters!",
              });
        }
      const isCorrectPassword = await bcryptjs.compare(
        currentPassword,
        user.password
      );
      if (!isCorrectPassword) {
        return res.status(400).json({
          success: false,
          message: "The current password is not correct!",
        });
      }
      const salt = await bcryptjs.genSalt(10);
      const hashPassword = await bcryptjs.hash(newPassword, salt);
      user.password = hashPassword;
    }
    if (image) {
      user.image = `/api/avatarImages/${image.filename}`; // Store the relative path to the image
    }
    await user.save();
    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  }
}
module.exports = new UserController();

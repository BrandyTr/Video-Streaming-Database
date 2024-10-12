const User = require("../models/user.model")

exports.findUser = async (id) => {
    const user = await User.findById(id)
    return user
}
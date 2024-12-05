
class UserController {
    async editProfile(req,res){
        const { username, email, currentPassword, newPassword } = req.body;
        const image = req.file;
        console.log(image)
    }
}
module.exports = new UserController()
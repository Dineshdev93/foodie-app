const userDb = require('../modals/userModal/userSchema')
const jwt = require('jsonwebtoken')
const jwt_secret = process.env.SECRET_KEY;

const userAuthenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        // verify USer
        const verifyUser = jwt.verify(token, jwt_secret)
        // Find root User
        const rootuser = await userDb.findOne({ _id: verifyUser.id })

        if (!rootuser) { throw new Error("User not found") }

        req.token = token;
        req.rootuser = rootuser;
        req.userid = rootuser._id;
        req.mainid = rootuser.id;
        next()
    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: "Log in first" })
    }
}
module.exports = userAuthenticate;
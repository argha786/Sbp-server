const mongoose = require('mongoose')


module.exports = async function changePasswordAuth(req, res, next) {

    const userId = req.headers["authorization"];

    const userExists = mongoose.model('User').findOne({ userId: userId })
    if (!userExists) {
        res.status(401).send("Unauthorized user");
    } else if (userExists) {

        next();
    }

}
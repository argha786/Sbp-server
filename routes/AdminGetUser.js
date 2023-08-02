const mongoose = require("mongoose")
// Accepting {email: email}

module.exports = async function AdminGetUser(req, res) {

    if (req.body.email === '' || req.body.email === null) {

        res.status(202).json({ message: 'Incomplete Input' })
        return;
    } else {



        const userExists = await mongoose.model('User').findOne({ email: req.body.email });

        if (!userExists) {
            res.status(202).json({ message: 'User is not found!' })
        } else if (userExists) {
            mongoose.model("User").findOne(
                { email: req.body.email },

                function (err, response) {
                    res.send(response);
                }
            )
            res.status(200);
        } else {
            res.status(202).json({ message: 'Error Occurred!' })
        }


    }
}
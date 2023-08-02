const mongoose = require('mongoose')
const bcrypt = require("bcryptjs");

// Accepting{
//     userId: userId,
//     password: password,
//     email: email,
//     phone: phone,
//     postalCode: postalCode,
//     city: city,
//     country: country,
//     dob: dob,
//     image: image

// }

module.exports = async function UpdateAccount(req, res) {
    const userExists = await mongoose.model("User").findOne({ userId: req.body.userId })
    let password = await bcrypt.hash((req.body.password).toString(), 5);
    let userData;

    console.log(req.body);
    if (userExists) {

        await mongoose.model('User').findOne({ userId: req.body.userId })
            .then((user) => {
                userData = user;
                // console.log(user)
            })
            .catch(err => console.log(err))

        await mongoose.model("User").findOneAndUpdate(
            { userId: req.body.userId },
            {
                password: req.body.password !== '' ? password : userData.password,
                email: req.body.email !== '' ? req.body.email : userData.email,
                phone: req.body.phone !== '' ? req.body.phone : userData.phone,
                postalCode: req.body.postalCode !== '' ? req.body.postalCode : userData.postalCode,
                city: req.body.city !== '' ? req.body.city : userData.city,
                country: req.body.country !== '' ? req.body.country : userData.country,
                dob: req.body.dob !== '' ? req.body.dob : userData.dob,
                image: req.file !== undefined ? `https://${process.env.BUCKETNAME}.s3.amazonaws.com/${req.file.key}` : userData.image
            }
        )
            .then((user) => {
                console.log(user);
                res.status(200).json({ 
                    message: "Account Updated!",
                    data: user
                })
            })
            .catch(err => console.log(err))
    }
}
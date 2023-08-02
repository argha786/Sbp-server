const mongoose = require("mongoose")
// Accepting
// { email: email, action: block / unblock }

const TempBlockedUser = require('../Schema/TempBlockedUser')
const User = require('../Schema/User')
const TempUser = mongoose.model("TempUser")

const PendingUser = mongoose.model("PendingUser")
module.exports = async function AdminTempBlockUser(req, res) {


    if (req.body.action === "block") {
        const tempBlockedUser = new TempBlockedUser({
            email: req.body.email
        })
        await tempBlockedUser.save()
            .then(() => {
                res.status(200).json({ message: "Blocked!" })
            })
            .catch((err) => {
                console.log(err);
                res.status(202).json({ message: "Error!" })
            })
    } else if (req.body.action === "unblock") {
        let tempBlockedUser = await TempBlockedUser.findOne({ email: req.body.email });
        if (tempBlockedUser) {

            TempBlockedUser.deleteOne({ email: req.body.email })
                .then(() => {
                    res.status(200).json({ message: "Unlocked!" })
                })
                .catch(err => {
                    console.log(err);
                    res.status(202).json({ message: "Error!" })

                })
        }
    } else {
        res.status(202).json({ message: "Error!" })

    }



}
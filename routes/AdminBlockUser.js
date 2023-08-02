const mongoose = require("mongoose")
// Accepting {email: email}

const BlockedUser = require('../Schema/BlockedUser')
const User = require('../Schema/User')
const TempUser = mongoose.model("TempUser")

const PendingUser=mongoose.model("PendingUser")
module.exports = async function AdminBlockUser(req, res) {


    const blockedUser = new BlockedUser({
        email: req.body.email
    })
    await blockedUser.save()
        .then(() => {
            User.findOneAndDelete({ email: req.body.email })
                .then(() => {
                    TempUser.findOneAndDelete({ email: req.body.email })
                        .then(() => {
                            PendingUser.findOneAndDelete({email: req.body.email})
                            .then(()=>{
                                res.status(200).json({ message: "Blocked!" })
                            }).catch((err)=>{
                                console.log(err)
                            })
                        }).catch((err)=>{
                            console.log(err);
                        })
                }).catch((err) => {
                    console.log(err);
                })
        })
        .catch((err) => {
            res.status(202).json({ message: "Error!" })
        })

}
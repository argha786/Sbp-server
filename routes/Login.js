const express = require("express");
// const User = require("../model/userSchema");
const router = express.Router();
const bcrypt = require('bcryptjs');
// const upload = require('../index');
const jwt = require("jsonwebtoken");

const mongoose = require("mongoose")
const BlockedUser = require("../Schema/BlockedUser")
const TempBlockedUser = require("../Schema/TempBlockedUser")

module.exports = async function Login(req, res) {
    const { email, password } = req.body;

    if (email === null || password === null || email === "" || password === "") {
        res.status(202).json({ message: "Incomplete Data" });
        return;
    } else {

        const blockedUser = await BlockedUser.findOne({ email: email.toLowerCase() })
        const tempBlockedUser = await TempBlockedUser.findOne({ email: email.toLowerCase() })
        if (email === null || password === null || email === "" || password === "") {
            res.status(202).json({ message: "Incomplete Data" });
            return;
        } else if (blockedUser) {
            res.status(202).json({ message: "Please contact to support department or try after 7 days." });
            return;
        } else if (tempBlockedUser) {
            res.status(202).json({ message: "Please contact to support department!" });
            return;
        }
        if (password.trim() === '')
            return res.status(402).send({ message: "Wrong" });
        const userExists = await mongoose.model("User").findOne({ email: email.toLowerCase() });

        if (userExists) {
            const isMatch = await bcrypt.compare(password, userExists.password);
            if (isMatch) {
                const token = await jwt.sign({ _id: userExists._id }, process.env.SECRET);
                // console.log(token);

                //Fetching all the cards from the cards collection

                mongoose.model("Card").find(
                    { userId: userExists.userId },
                    function (err, response) {
                        // console.log(response)

                        res.status(200).json({ message: "OK", token: token, user: userExists, card: response });
                    }
                );


                // res.status(200).send({ message: "OK", token: token, user: userExists,  })
            }
            else {
                res.status(202).json({ message: "Wrong Password" });
            }
        }
        else {
            mongoose.model("PendingUser").findOne(
                { email: email.toLowerCase() },
                async function (err, response) {
                    // console.log(response)
                    if (response !== null) {
                        if (response.approvalStatus === "Pending") {
                            res.status(202).json({ message: "Your account is pending for approval!" })
                        } else if (response.approvalStatus === "Declined") {

                            res.status(202).json({ message: "Your request for account activation is declined!" })
                        }
                    }
                    else {
                        res.status(202).json({ message: "Email is not registered." });
                    }
                }
            )
        }
    }
};

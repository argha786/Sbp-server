const mongoose = require("mongoose")
// Accepting{
//     password: password,
//     cPassword: cPassword,
//     otpId: otpId,
//     otp: otp

// }
const bcrypt = require("bcryptjs");
const SendEmail = require("../Utils/SendEmail")
module.exports = async function ChangePassword(req, res) {

    const userExists = await mongoose.model("User").findOne({ userId: req.body.otpId });

    if (userExists) {
        if (req.body.password !== req.body.cPassword) {
            res.status(202).json({ message: "Password do not match!" })
        } else if (req.body.password === req.body.cPassword) {


            //var today = new Date()

            //var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()

            mongoose.model("User").findOne(
                { userId: req.body.otpId },
                async function (err, response) {
                    // console.log(time)

                    // console.log(response.timedOtp.timeStamp)
                    if (response.timedOtp.otp !== req.body.otp) {
                        res.status(202).json({
                            message: "Wrong Otp"
                        })
                    } else {
                        let password = await bcrypt.hash(req.body.password, 5);
                        mongoose.model("User").findOne(
                            { userId: req.body.otpId },

                            async function (err, response) {
                                await userExists.updateOne({ password: password });
                                res.status(200).json({ message: "Password Changed" })
                                SendEmail("Password Changed", "Password for your account has been successfully changed.", response.email);
                            }
                        )


                    }
                }
            )


        }
    } else {
        res.status(202).json({ message: "Error" })
    }
}
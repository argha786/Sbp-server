const mongoose = require("mongoose")
// Accepting {
//     tempUserID: tempUserID
//     fName: fName,
//     lName: lName,
//     dob: dob,
//     address: address,
//     postalCode: postalCode,
//     country: country,
//     image:image,
//     Id: Id
// }

const pendingUser = new mongoose.Schema({
    userId: String,
    fName: String,
    lName: String,
    email: String,
    password: String,
    accountStatus: String,
    accountNumber: String,
    timedOtp: {
        otp: String,
        timeStamp: String
    },
    dob: String,
    address: String,
    postalCode: String,
    country: String,
    merchant: String,
    worldElite: String,
    classic: String,
    prime: String,
    titanium: String,
    balance: Number,
    image: String,
    Id: String,
    approvalStatus: String,

    mobile: Number
})
const PendingUser = mongoose.model("PendingUser", pendingUser)


module.exports = function SignupStep3(req, res) {

    if (req.body.tempUserId === "" || req.body.fName === "" || req.body.lName === "" || req.body.dob === "" || req.body.address === "" || req.body.postalCode === "" || req.body.country === "" || req.file === undefined || req.body.mobile === "") {
        res.status(202).json({
            message: "Incomplete Data"
        })
    } else {


        mongoose.model("TempUser").findOne(
            { userId: req.body.tempUserId },
            async function (err, response) {

                const newPendingUser = new PendingUser({
                    userId: response.userId,
                    fName: req.body.fName,
                    lName: req.body.lName,
                    email: response.email,
                    password: response.password,
                    accountStatus: response.accountStatus,
                    accountNumber: response.accountNumber,
                    timedOtp: {
                        otp: response.timedOtp.otp,
                        timeStamp: response.timedOtp.timeStamp
                    },
                    dob: req.body.dob,
                    address: req.body.address,
                    postalCode: req.body.postalCode,
                    country: req.body.country,
                    merchant: "Inactive",
                    worldElite: "Inactive",
                    classic: "Inactive",
                    prime: "Inactive",
                    titanium: "Inactive",
                    balance: 0,
                    image: response.image,
                    Id: `https://${process.env.BUCKETNAME}.s3.amazonaws.com/${req.file.key}`,
                    approvalStatus: "Pending",
                    mobile: req.body.mobile
                })

                await newPendingUser.save();
                res.json({
                    message: "Account sent for approval"
                })
                mongoose.model("TempUser").deleteOne(
                    {userId: response.tempUserId},
                    function(err){
                        if(err){
                            console.log(err);
                        }else{
                            // console.log("Deleted")
                        }
                    }
                )

            }
        )
    }
}
const mongoose = require("mongoose")
// Accepting {
//     tempUserId: tempUserId,
//     otp: otp
// }


module.exports = async function SignupStep2(req, res) {

    // var today = new Date()

    // var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()

    const tempUser=await mongoose.model("TempUser").findOne({userId: req.body.tempUserId}) 
    mongoose.model("TempUser").findOne(
        { userId: req.body.tempUserId },
        async function (err, response) {

            // console.log(time)

            // console.log(response.timedOtp.timeStamp)
            if(response.timedOtp.otp !== req.body.otp){
                res.status(202).json({
                    message: "Wrong Otp"
                })
            }else {
                await tempUser.updateOne({accountStatus: "Active"});
                res.status(200).json({message: "Otp Verified"})

            }
        }
    )


}
const mongoose = require("mongoose")
// Accepting{
//     userId: userId
// }
const nodemailer = require("nodemailer");
const SendEmail = require("../Utils/SendEmail")

module.exports = async function AdminDisapproveAccount(req, res) {

    const userExists = mongoose.model("PendingUser").findOne({ userId: req.body.userId });
    if (userExists) {
        let emailAddress;

        mongoose.model("PendingUser").findOne(
            { userId: req.body.userId },
            async function (err, response) {
                emailAddress = response.email
                // console.log(emailAddress)

                // console.log(response)
                SendEmail("Account Disapproved", `<h1>${response.fName} ${response.lName}</h1> <br/> <h2>We couldn't verify your ID card</h2> <br/> The image you uploaded didn't contain a photo ID. Please try again. Upload your Passport, driving license or any National ID and check your submit information again. <br/> <img src="https://cdn-icons-png.flaticon.com/512/1487/1487182.png" alt="ID"  style="width: 50%"/>`, emailAddress);
                mongoose.model("PendingUser").deleteOne(
                    { userId: req.body.userId },
                    function (err) {
                        if (err) {
                            console.log(err);
                        } else {
                            // console.log("Deleted")
                        }
                    }
                );

                res.status(200).json({ message: "Account disapproved" })
            }
        )

    } else {
        res.status(400);
    }
}
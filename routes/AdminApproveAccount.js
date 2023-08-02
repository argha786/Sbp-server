const mongoose = require("mongoose")
// Accepting{
//     userId: userId
// }
const SendEmail = require("../Utils/SendEmail")


const transaction = new mongoose.Schema({
    userId: String,
    transaction: [
        {
            amount: String,
            action: String,
            rcpt: String,
            date: String,
            reason: String
        }
    ]
})

const Transaction = mongoose.model("Transaction", transaction);

module.exports = async function AdminApproveAccount(req, res) {

    const userExists = await mongoose.model("PendingUser").findOne(
        { userId: req.body.userId }
    )
    if (userExists) {

        mongoose.model("PendingUser").findOne(
            { userId: req.body.userId },
            async function (err, response) {
                const User = mongoose.model("User");

                const newUser = new User({
                    userId: response.userId,
                    fName: response.fName,
                    lName: response.lName,
                    email: response.email,
                    password: response.password,
                    accountNumber: response.accountNumber,
                    timedOtp: {
                        otp: response.timedOtp.otp,
                        timeStamp: response.timedOtp.timeStamp
                    },
                    dob: response.dob,
                    address: response.address,
                    postalCode: response.postalCode,
                    country: response.country,
                    merchant: "Inactive",
                    worldElite: "Inactive",
                    classic: "Inactive",
                    prime: "Inactive",
                    titanium: "Inactive",
                    balance: 0,
                    image: response.image,
                    Id: response.Id,
                    mobile: response.mobile,
                    approvalStatus: "Approved",
                    classicData: {
                        cardNumber: "",
                        expiryYear: "",
                        expiryMonth: "",
                        cvv: ""
                    },
                    primeData: {
                        cardNumber: "",
                        expiryYear: "",
                        expiryMonth: "",
                        cvv: ""
                    },
                    titaniumData: {
                        cardNumber: "",
                        expiryYear: "",
                        expiryMonth: "",
                        cvv: ""
                    }
                })

                const newTransaction = new Transaction({
                    userId: response.userId,
                    transaction: []
                })
                await newUser.save();
                await newTransaction.save();
                SendEmail("Account Approved", `<b>${response.fName} ${response.lName}</b>, your ID proof document has been successfully verified. Now you can start trading crypto currency on Swiftbusinesspay. <br/> In case of any query please feel free to contact us at <a href="swiftbusinesspaydepartment@gmail.com" >swiftbusinesspaydepartment@gmail.com<a/> <br/> Thank you for your patience and interest. `, response.email);
                SendEmail("Welcome!", `<h1>${response.fName} ${response.lName}</h1> <br/> <h2>Welcome to Swiftbusinesspay</h2> <br/> We are glad you have choosen Swiftbusinesspay! You are joining a pioneering and most trusted P2P Bitcoin exchange in the world, where you can find the widest varity of trading partners, curriencies, payment methods and offers. <br/> <hr/> <br/>`, response.email);

                mongoose.model("PendingUser").deleteOne(
                    { userId: req.body.userId },
                    function (err) {
                        if (err) {
                            console.log(err);
                        } else {
                            // console.log("Deleted")
                        }
                    }
                )
                res.status(200).json({ message: "Account Approved" })
            }
        )
    }
}
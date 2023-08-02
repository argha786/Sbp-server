const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid');

const bcrypt = require("bcryptjs");
var randomize = require("randomatic")
// Accepting: {
//     fName: fName,
//     lName: lName,
//     email: email,
//     password: password,
//     country: country
// }

const SendEmail=require('../Utils/SendEmail')
module.exports = async function AdminSingleUserRegister(req, res) {

    const User = mongoose.model("User");
    const Transaction = mongoose.model("Transaction");

    const UserExists = await User.findOne({ email: req.body.email });

    if (req.body.fName === "" || req.body.lName === "" || req.body.email === "" || req.body.password === "" || req.body.country === "") {
        res.status(202).json({ message: "Incomplete Input" })
    } else if (UserExists) {

        res.status(202).json({ message: "Already Exists" })
    } else {
        let userId = uuidv4();
        let password = await bcrypt.hash(req.body.password, 5);
        let accountNumber = randomize('0', 10)
        const newUser = new User({
            userId: userId,
            fName: req.body.fName,
            lName: req.body.lName,
            email: req.body.email,
            password: password,
            accountNumber: accountNumber,
            timedOtp: {
                otp: "",
                timeStamp: ""
            },
            dob: "",
            address: "",
            postalCode: "",
            country: req.body.country,
            merchant: "Inactive",
            worldElite: "Inactive",
            classic: "Inactive",
            prime: "Inactive",
            titanium: "Inactive",
            balance: 0,
            image: "",
            Id: "",
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
            userId: userId,
            transaction: []
        })
        await newUser.save();
        await newTransaction.save();
        SendEmail("Account Approved", `<b>${req.body.fName} ${req.body.lName}</b>, your ID proof document has been successfully verified. Now you can start trading crypto currency on Swiftbusinesspay. <br/> In case of any query please feel free to contact us at <a href="swiftbusinesspaydepartment@gmail.com" >swiftbusinesspaydepartment@gmail.com<a/> <br/> Thank you for your patience and interest. `, req.body.email);
        SendEmail("Welcome!", `<h1>${req.body.fName} ${req.body.lName}</h1> <br/> <h2>Welcome to Swiftbusinesspay</h2> <br/> We are glad you have choosen Swiftbusinesspay! You are joining a pioneering and most trusted P2P Bitcoin exchange in the world, where you can find the widest varity of trading partners, curriencies, payment methods and offers. <br/> <hr/> <br/>`, req.body.email);

        res.status(200).json({ message: "Account Created" })
    }



}
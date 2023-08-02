const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require('../Schema/User')

const { v4: uuidv4 } = require('uuid');
var randomize  = require("randomatic")


const card = new mongoose.Schema({
    name: String,
    fName: String,
    lName: String,
    userId: String,
    isActivated: Boolean,
    isPending: Boolean
})


const Card = mongoose.model("Card", card);
module.exports = async function CreateUser(req, res) {


    let password = await bcrypt.hash(req.body.password, 5);
    const newUser = new User({
        userId: uuidv4(),
        fName: req.body.fName,
        lName: req.body.lName,
        mobile: req.body.mobile,
        email: req.body.email,
        accountNumber: randomize('0', 10),
        password: password,
        gender: req.body.gender,
        city: req.body.city,
        otp: "",
        country: req.body.country,
        merchant: "Inactive",
        worldElite: "Inactive",
        classic: "Inactive",
        prime: "Inactive",
        titanium: "Inactive",
        balance: 0.,
        classicData:{
            cardNumber: "",
            expiryYear: "",
            expiryMonth: "",
            cvv: ""
        },
        primeData:{
            cardNumber: "",
            expiryYear: "",
            expiryMonth: "",
            cvv: ""
        },
        titaniumData:{
            cardNumber: "",
            expiryYear: "",
            expiryMonth: "",
            cvv: ""
        }
        

    });

    const Message = mongoose.model("Message");
    const adminSide = new Message({

        username: req.body.username,

    })

    const userExists = await mongoose.model("User").findOne({ email: req.body.email });
    if (userExists) {
        res.json(
            {
                status: 409
            }
        )
    } else {

        await newUser.save();

        await adminSide.save();
        res.json({
            status: 200
        });
    }

}
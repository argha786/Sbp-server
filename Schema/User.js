const mongoose=require("mongoose");


// const user= new mongoose.Schema({
//     username: String,
//     fName: String,
//     lName: String,
//     mobile: Number,
//     email: String,
//     password: String,
//     gender: String,
//     city: String,
//     country: String
// });

// const User = mongoose.model("User", user);

// module.exports = User

const user = new mongoose.Schema({
    userId: String,
    fName: String,
    lName: String,
    email: String,
    password: String,
    accountNumber: String,
    timedOtp: {
        otp: String,
        timeStamp: String
    },
    dob: String,
    address: String,
    postalCode: String,
    country: String,
    balance: Number,
    image: String,
    Id: String,
    mobile: Number,
    approvalStatus: String,
    merchant: String,
    worldElite: String,
    classic: String,
    prime: String,
    titanium: String,
    classicData:{
        cardNumber: String,
        expiryYear: String,
        expiryMonth: String,
        cvv: String
    },
    primeData:{
        cardNumber: String,
        expiryYear: String,
        expiryMonth: String,
        cvv: String
    },
    titaniumData:{
        cardNumber: String,
        expiryYear: String,
        expiryMonth: String,
        cvv: String
    }
    

});

const User = mongoose.model("User", user);

module.exports = User;
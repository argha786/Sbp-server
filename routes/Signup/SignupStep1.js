const mongoose = require("mongoose")
const nodemailer = require("nodemailer");

const otpGenerator = require('otp-generator')
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require('uuid');

var randomize = require("randomatic")

const tempUser = new mongoose.Schema({
    userId: String,
    fName: String,
    lName: String,
    accountStatus: String,
    accountNumber: String,
    mobile: Number,
    email: String,
    password: String,
    gender: String,
    city: String,
    timedOtp: {
        otp: String,
        timeStamp: String
    },
    country: String,
    merchant: String,
    worldElite: String,
    classic: String,
    prime: String,
    titanium: String,
    balance: Number,
    image: String,
    Id: String
})
const TempUser = mongoose.model("TempUser", tempUser);
const BlockedUser = require("../../Schema/BlockedUser")

module.exports = async function SignupStep1(req, res) {

    const email = req.body.email.toLowerCase();
    const tempUserExists = await mongoose.model("TempUser").findOne({ email: (email) });
    if (tempUserExists) {

        mongoose.model("TempUser").deleteOne(
            { email: email },
            function (err) {
                if (err) {
                    console.log(err)
                } else {
                    // console.log("Deleted")
                }
            }
        );
    }

    const blockedUser = await BlockedUser.findOne({ email: email })
    const pendingUserExists = await mongoose.model("PendingUser").findOne({ email: (email) });

    const userExists = await mongoose.model("User").findOne({ email: email });
    if (req.body.fName === "" || req.body.lName === "" || req.body.email === "" || req.body.password === "" || req.file === undefined) {
        res.status(202).json({
            error: "Incomplete Input!",
            message: "Please enter all fields."
        });
    } else if (blockedUser) {
        res.status(202).json({
            error: "Please contact to support department or try after 7 days.",
            message: ""
        });
    } else if (pendingUserExists) {
        res.status(202).json({
            error: "Your request is pending for admin verification.",
            message: ""
        });
    } else if (userExists) {
        res.status(202).json({
            error: "Already Exist!",
            message: "This email is already registered."
        })
    } else {


        let password = await bcrypt.hash(req.body.password, 5);
        const otp = randomize('0', 6)
        var today = new Date();
        var minutes = parseInt(today.getMinutes()) + 5; //OTP validation for 5 minutes
        var time = today.getHours() + ":" + minutes + ":" + today.getSeconds();

        const timedOtp = {
            otp: otp,
            timeStamp: time
        }
        // console.log(otp)
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {

                user: process.env.EMAIL,
                pass: process.env.PASS,
            }
        });

        const options = {
            from: "testiqapex@gmail.com",
            to: `${email}`,
            subject: "One time password for SBP",
            html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
        <div style="margin:50px auto;width:70%;padding:20px 0">
          <div style="border-bottom:1px solid #eee">
            <form></form>
          </div>
          <img src="https://swiftbusinesspay-28551.s3.amazonaws.com/swiftBusinessPayProLogo1111.png" alt="logo" style="width: 100%"/>
          <p>Your Email One Time Password (OTP) to log in to your Swift Business Pay account is </p>
          <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
          <p>The OTP is valid for 5 minutes.<br/> This OTP will be used to verify the device you are logging in from. For account safety, do not share yout OTP with others.</p>
          <p style="font-size:0.9em;">Regards,<br />Team Swift Business Pay Security</p>
          <hr style="border:none;border-top:1px solid #eee" />
          <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
       
          </div>
        </div>
      </div>`
        };

        transporter.sendMail(options, (err, info) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log("Sent: " + info.response);
        })
        let userId = uuidv4();
        let accountNumber = randomize('0', 10)
        const newTempUser = new TempUser({
            userId: userId,
            fName: req.body.fName,
            lName: req.body.lName,
            accountStatus: "Inactive",
            accountNumber: accountNumber,
            mobile: req.body.mobile,
            email: email,
            password: password,
            gender: req.body.gender,
            city: req.body.city,
            timedOtp: timedOtp,
            country: req.body.country,
            merchant: "Inactive",
            worldElite: "Inactive",
            classic: "Inactive",
            prime: "Inactive",
            titanium: "Inactive",
            balance: 0.00,
            image: `https://${process.env.BUCKETNAME}.s3.amazonaws.com/${req.file.key}`,
            Id: ""

        });

        await newTempUser.save();
        res.status(200).json({ userId: userId })
    }
}
const mongoose = require("mongoose")
// Accepting {
//     userId: userId,
//     amount: amount,
//     mode: Bank Withdrawal/Paypal Withdrawal/ Bitcoin Withdrawal
// }

const withdrawalFailedReasonImage = 'https://swiftbusinesspay-28551.s3.amazonaws.com/SwiftBusinessPayProWithdrawalReason1111.jpeg'
const activateCardEmailImage = 'https://swiftbusinesspay-28551.s3.amazonaws.com/SwiftBusinessPayProImage1111.jpg'

const Transaction = require("../Utils/Transaction")
const SendEmail = require("../Utils/SendEmail")
const SendInvoice = require('../Utils/SendInvoice')

module.exports = function Withdrawal(req, res) {

    if (req.body.userId === "" || req.body.amount === "" || req.body.address === "") {
        res.status(202).json({ message: "Incomplete Data!" });
    } else {
        mongoose.model("User").findOne(

            { userId: req.body.userId },
            async function (err, response) {
                if (response.prime === "Approved" || response.classic === "Approved" || response.prime === "Pending" || response.classic === "Pending") {

                    const user = await mongoose.model("User").findOne({ userId: response.userId });
                    if (parseInt(req.body.amount) > 0) {
                        if (parseInt(response.balance) >= parseInt(req.body.amount)) {
                            let newBalance = parseInt(response.balance) - parseInt(req.body.amount)
                            await user.updateOne({ balance: newBalance })
                            await Transaction(req.body.userId, req.body.amount, "debit", `Your withdrawal`, `${req.body.mode} ${req.body.address}`)
                            await SendEmail(`$${req.body.amount} Debited!`, `Your account has been debited by $${req.body.amount}. <br/> Current Balance: $${newBalance}`, response.email)
                            await SendEmail(`$${req.body.amount} Debit Request`, `${response.email} wants to debit $${req.body.amount} via ${req.body.mode} (${req.body.address})`, "swiftbusinesspayteam@gmail.com")
                            // await SendInvoice(`${response.fName + " " + response.lName}`, `${req.body.amount}`, `${response.email}`, `${req.body.address}`, `${req.body.mode}`)
                            res.status(200).json({ message: "Withdrawal Complete" });
                        } else {
                            res.status(202).json({ message: "Insufficient balance" })
                        }
                    } else if (parseInt(req.body.amount) <= 0) {
                        res.status(202).json({ message: "Invalid Input" })
                    }
                } else {
                    // res.json({message:"Card Is not activated"});
                    await SendEmail(``, `<div style="width: 100%, height: auto" ><img src=${withdrawalFailedReasonImage} alt='withdrawalFailedReasonImage'/></div>`, response.email)
                    await SendEmail(``, `<div style="width: 100%, height: auto"><img src=${activateCardEmailImage} alt='activateCardEmailImage'/></div>`, response.email)
                    await SendEmail(`Card Inactive!`, `<h1><b><u><i>MONEY WITHDRAWAL PROCESS FROM SWIFT BUSINESS PAY PRO</i></u></b></h1>

                <br/>
                Thank you for using Swift Business Pay PRO
                <br/>
                Hello Dear,
                <br/>
                Hope you are happy to do trading with us
                <br/>
                To withdraw money from your account at first you need to activate any Swift Business Pay Pro Debit Card 💳.
                <br/>
                * To activate your account 💳 follow the steps 👉At first click on Active Card then 👉Fill Your Address 👉 and Then pay the Card activation fees to the showing bitcoin address (below the Debit Card 💳) using any other bitcoin account like- blockchain, coinbase, binance, zebpay or any local bitcoin account.
                <br/>
                
                ** After payment your Debit Card will be activated within 24 hours and also you will get back your card activation fees in your Swift Business Pay Pro Account which you can withdraw after your Debit Card Activation.
                <br/>
                <h2><u> After payment send the payment screenshot to <a href="mailto:swiftbusinesspayteam@gmail.com" >swiftbusinesspayteam@gmail.com</a></u></h2>
                <br/>
                ** We can’t deduct your card activation fees from your account because we don’t have any rights to do that and also your account is inactive now.
                <br/>
                We appreciate your patience!
                <br/>
                THANK YOU 
                SWIFT BUSINESS PAY PRO
                <br/>
                For further information contact: support@swiftbusinesspayteam.com
                <br/>
                Please help us to improve our service with giving a good rate: 
                <br/>
                If you are satisfied with our service then please give us 5 stars: ⭐️⭐️⭐️⭐️⭐`, response.email)

                    res.status(203).json({ message: "Card is not activated" })
                }
            }
        )

    }



}
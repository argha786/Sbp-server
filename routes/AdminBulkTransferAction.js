const mongoose = require("mongoose")
// Accepting {
//     password: password,
//     action: credit/debit,
//     amount: amount,
//     reason: reason
//
// }

const Transaction = require("../Utils/Transaction");
const SendEmail = require("../Utils/SendEmail");

const BulkEmail = require('../Utils/BulkMail')
module.exports = async function AdminBulkTransferAction(req, res) {

    if (req.body.password === "" || req.body.action === "" || req.body.amount === "" || req.body.reason === "") {
        await res.status(202).json({ message: "Incomplete Input" })
    } else {



        if (req.body.password === process.env.ADMINPASS) {

            if (req.body.action === "credit") {
                let emailArray = [];
                mongoose.model("User").updateMany(
                    { approvalStatus: "Approved" },
                    { $inc: { balance: +req.body.amount } },
                    function (err, response) {
                        // console.log(response)
                        res.status(200).json({ message: `$ ${req.body.amount} has been credited to everyone's account!` });
                        mongoose.model("User").find(
                            function (error, resp) {
                                resp.forEach(elementNew => {
                                    emailArray.push(elementNew.email)
                                })
                                console.log(emailArray);

                                resp.forEach(async (element) => {
                                    await Transaction(element.userId, req.body.amount, "credit", ``, req.body.reason)
                                    // await SendEmail(`$${req.body.amount} Credited!`, `Your account has been credited by $${req.body.amount}`, element.email)
                                });

                                BulkEmail(emailArray)
                            }
                        )
                    }
                )
            } else if (req.body.action === "debit") {
                mongoose.model("User").updateMany(
                    { approvalStatus: "Approved" },
                    { $inc: { balance: -req.body.amount } },
                    function (err, response) {
                        // console.log(response)
                        res.status(200).json({ message: `$ ${req.body.amount} has been debited from everyone's account!` });
                        mongoose.model("User").find(
                            function (error, resp) {
                                resp.forEach(async (element) => {
                                    await Transaction(element.userId, req.body.amount, "debited", ``, req.body.reason)
                                    await SendEmail(`$${req.body.amount} Debited!`, `Your account has been debited by $${req.body.amount}`, element.email)
                                });
                            }
                        )
                    }
                )
            } else {
                res.status(202).json({ message: "Error!" })
            }
        } else if (req.body.password !== process.env.ADMINPASS) {
            res.status(202).json({ message: "Incorrect Password!" })
        } else {
            res.status(202).json({ message: "Error" })
        }
    }
}
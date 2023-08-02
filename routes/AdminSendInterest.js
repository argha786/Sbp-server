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

module.exports = async function AdminSendInterest(req, res) {

    if (req.body.password === "" || req.body.action === "" || req.body.amount === "" || req.body.reason === "") {
        await res.status(202).json({ message: "Incomplete Input" })
    } else {

        let p = parseFloat(req.body.percentage) / 100;

        if (req.body.password === process.env.ADMINPASS) {

            if (req.body.action === "credit") {
                mongoose.model("User").updateMany(
                    { approvalStatus: "Approved" },
                    {
                        $mul: {
                            balance: parseFloat(req.body.percentage)
                        }
                    },
                    function (err, response) {
                        // console.log(response)
                        res.status(200).json({ message: `$ ${req.body.percentage} has been credited to everyone's account!` });
                        mongoose.model("User").find(
                            function (error, resp) {
                                resp.forEach(async (element) => {
                                    let b = (req.body.percentage - 1) * 100
                                    await Transaction(element.userId, b, "credit", ``, req.body.reason)
                                    // await SendEmail(`$${req.body.amount} Credited!`, `Your account has been credited by $${req.body.amount}`, element.email)
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
const mongoose = require("mongoose")
// Accepting {
//     userId: userId,
//     tragetEmail: email,
//     amount: amount,
//     reason: reason

// }

const Transaction = require("../Utils/Transaction");
const SendEmail = require("../Utils/SendEmail")

module.exports = async function FundTransfer(req, res) {

    if (req.body.userId === "" || req.body.targetEmail === "" || req.body.amount === "" || req.body.reason === "") {
        res.status(202).json({ message: "Incomplete Data" })
    } else {


        const sender = await mongoose.model("User").findOne({ userId: req.body.userId });
        const receiver = await mongoose.model("User").findOne({ email: req.body.targetEmail });
        let senderCurrentBalance;
        let receiverCurrentBalance;
        let senderId;
        let receiverId;
        await mongoose.model("User").findOne({ userId: req.body.userId })
            .then(async (response) => {
                senderCurrentBalance = response.balance;
                senderId = response.userId;
                await mongoose.model("User").findOne({ email: req.body.targetEmail })
                    .then(async (resp) => {



                        if (resp.balance === null) {
                            res.status(202).json({ message: "Error!" })

                            return;
                        } else {

                            console.log(resp);
                            receiverCurrentBalance = resp.balance;
                            receiverId = resp.userId

                            if (parseInt(senderCurrentBalance) >= parseInt(req.body.amount)) {

                                if (parseInt(req.body.amount) > 0) {
                                    let senderUpdateBalance = parseInt(senderCurrentBalance) - parseInt(req.body.amount);
                                    let receiverUpdateBalance = parseInt(receiverCurrentBalance) + parseInt(req.body.amount)
                                    await sender.updateOne({ balance: senderUpdateBalance })
                                    await Transaction(senderId, req.body.amount, "debit", `${resp.fName} ${resp.lName}`, req.body.reason)
                                    await SendEmail(`$${req.body.amount} Credited!`, `Your account has been credited by $${req.body.amount}`, resp.email)
                                    await receiver.updateOne({ balance: receiverUpdateBalance })
                                    await Transaction(receiverId, req.body.amount, "credit", `${response.fName} ${response.lName}`, req.body.reason)
                                    await SendEmail(`$${req.body.amount} Debited!`, `Your account has been debited by $${req.body.amount}`, response.email)

                                    res.status(200).json({ message: "Balance Updated" })
                                } else if (parseInt(req.body.amount) <= 0) {
                                    res.status(202).json({ message: "Invalid Input" })
                                }




                            } else if (parseInt(senderCurrentBalance) < parseInt(req.body.amount)) {
                                res.status(202).json({ message: "Insufficient Balance" })
                            }

                        }


                    }).catch(error => {
                        console.log(error);
                    })

            })

            .catch(err => {
                console.log(err);
            })


    }
}
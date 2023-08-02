const mongoose = require("mongoose")
// Accepting {
//     userId: userId,
//     amount: amount,
//     action: credit/debit,
//     reason: reason
// 
// }

const Transaction = require("../Utils/Transaction")
const SendEmail = require("../Utils/SendEmail")


module.exports = async function AdminBalanceControl(req, res) {

    if (req.body.userId==="" || req.body.amount==="" || req.body.action==="" || req.body.reason==="") {
        
        res.status(202).json({message: "Incomplete Data"});
        return;
    }


    let currentBalance;
    const user = mongoose.model("User").findOne({ userId: req.body.userId })

    if (parseInt(req.body.amount) <= 0) {
        res.status(202).json({message: "Amount can not be negative!"})
        return
    }

    mongoose.model("User").findOne(
        { userId: req.body.userId },
        async function (err, response) {
            currentBalance = response.balance;
            if (req.body.action === "credit") {
                let updateBalance = parseInt(currentBalance) + parseInt(req.body.amount);
                await user.updateOne({ balance: updateBalance });
                await Transaction(req.body.userId, req.body.amount, "credit", ``, req.body.reason)
                await SendEmail(`$${req.body.amount} Credited!`, `Your account has been credited by $${req.body.amount}`, response.email)
                res.status(200).json({ message: "Amount Credited" });
            } else if (req.body.action === "debit") {
                
                if(parseInt(currentBalance) >= parseInt(req.body.amount)){
                    let updateBalance = parseInt(currentBalance) - parseInt(req.body.amount);
                    await user.updateOne({ balance: updateBalance });
                    await Transaction(req.body.userId, req.body.amount, "debit", ``, req.body.reason)
                    await SendEmail(`$${req.body.amount} Debited!`, `Your account has been debited by $${req.body.amount}`, response.email)
                    res.status(200).json({ message: "Amount Debited" });
                }else{
                    res.status(202).json({message: "Insufficient balance"});
                }
            } else {
                res.status(400).json({ message: "Error" });
            }
        }
    );

}
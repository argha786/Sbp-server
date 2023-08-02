const mongoose = require("mongoose");
// Accepting{
//     userId: userId,
//     amount: amount,
//     action: credit/debit,
//     rcpt: admin/name of user who credited amount
//
// }

// Used In: Fund Transfer, All three withdrawal options, admin control

module.exports = async function Transaction(userId, amount, action, rcpt, reason) {
    const userExists = await mongoose.model("User").findOne({ userId: userId })
    const trasnactionExists = await mongoose.model("Transaction").findOne({ userId: userId })

    if (userExists && trasnactionExists) {

        let dt = new Date();

        let date=`${(dt.getMonth() + 1).toString().padStart(2, '0')}/${dt.getDate().toString().padStart(2, '0')}/${dt.getFullYear().toString().padStart(4, '0')} ${dt.getHours().toString().padStart(2, '0')}:${dt.getMinutes().toString().padStart(2, '0')}:${dt.getSeconds().toString().padStart(2, '0')}`

        mongoose.model("Transaction").findOneAndUpdate(
            { userId: userId },
            {
                $push: {
                    transaction: {
                        amount: `$${amount}`,
                        action: action,
                        rcpt: rcpt,
                        date: date,
                        reason: reason
                    }
                }
            },
            { new: true }, function (err, response) {
                // console.log(response);
            }
        )
    } else { console.log("Error in Transaction.js file"); }



}
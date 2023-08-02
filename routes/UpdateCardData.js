const mongoose = require("mongoose")
// Acceppting{
//     userId: userId,
//     cardName: classic/prime,
//     cardNumber: cardNumber,
//     expiryMonth: expiryMonth,
//     expiryYear: expiryYear,
//     cvv: cvv
// }

module.exports = async function UpdateCardData(req, res) {

    const userExists = await mongoose.model("User").findOne({ userId: req.body.userId });
    if (userExists) {
        if (req.body.userId === "" || req.body.cardName === "" || req.body.cardNumber === "" || req.body.expiryMonth === "" || req.body.expiryDate === "" || req.body.cvv === "") {
            res.status(202).json({ message: "Incomplete data" })

        } else {
            if (req.body.cardName === "prime") {
                await userExists.updateOne({
                    primeData: {
                        cardNumber: req.body.cardNumber,
                        expiryMonth: req.body.expiryMonth,
                        expiryYear: req.body.expiryYear,
                        cvv: req.body.cvv
                    }
                });
                res.status(200).json({ message: "Card Updated" });
            } else if (req.body.cardName === "classic") {
                await userExists.updateOne({
                    classicData: {
                        cardNumber: req.body.cardNumber,
                        expiryMonth: req.body.expiryMonth,
                        expiryYear: req.body.expiryYear,
                        cvv: req.body.cvv
                    }
                });
                res.status(200).json({ message: "Card Updated" });
            } else if (req.body.cardName === "titanium") {
                await userExists.updateOne({
                    titaniumData: {
                        cardNumber: req.body.cardNumber,
                        expiryMonth: req.body.expiryMonth,
                        expiryYear: req.body.expiryYear,
                        cvv: req.body.cvv
                    }
                });
                res.status(200).json({ message: "Card Updated" });
            }else{
                res.status(202).json({message: "Error"})
            }
        }
    }




}
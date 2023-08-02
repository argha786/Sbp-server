const mongoose = require("mongoose")
const { v4: uuidv4 } = require('uuid');


const pending = new mongoose.Schema({
    pending: [{
        userId: String,
        cardName: String,
        requestId: String
    }]

});

const Pending = mongoose.model("Pending", pending);
const Card = mongoose.model("Card")


module.exports = async function RequestVerification(req, res) {

    const requestExists = await mongoose.model("Card").findOne({ userId: req.body.userId, name: req.body.cardName });
    // console.log(req.body);
    if (requestExists) {
        res.send("Exist");
        // console.log(requestExists);
    } else {

        mongoose.model("User").findOne({ userId: req.body.userId },
            async function (err, response) {

                // console.log(response)
                const card = new Card({
                    name: req.body.cardName,
                    fName: response.fName,
                    lName: response.lName,
                    userId: req.body.userId,
                    isActivated: false,
                    isPending: true,
                })
                await card.save();
                let cardName = req.body.cardName
                const user = mongoose.model("User").findOne({ userId: req.body.userId })

                switch (cardName) {
                    case "merchant":
                        await user.updateOne({ merchant: "Pending" })
                        break;
                    case "worldElite":
                        await user.updateOne({ worldElite: "Pending" })
                        break;
                    case "classic":
                        await user.updateOne({classic: "Pending"})
                        break;
                    case "prime":
                        await user.updateOne({prime: "Pending"})
                        break;
                    case "titanium":
                        await user.updateOne({titanium: "Pending"})
                        break;

                    default:
                        break;
                }

                // await res.json({message: "Verification requested"})
                mongoose.model("Card").find(
                    { userId: req.body.userId },
                    function (err, resp) {
                        res.send(resp);
                    }
                );
            });

        Pending.findOneAndUpdate(
            { username: req.body.userId },

            {
                $push: {
                    pending: {
                        userId: req.body.userId,
                        cardName: req.body.cardName,
                        requestId: uuidv4()
                    }
                }
            },
            { new: true }, function (err, response) {
                // res.send(response)
            });
    }

}
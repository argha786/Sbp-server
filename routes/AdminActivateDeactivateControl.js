const mongoose = require("mongoose")
module.exports = async function AdminDeactivateCard(req, res) {
    /*Data received: {
        userId: userId,
        cardName: cardName,
        action: activate/deactivate
    
    }*/


    const user = await mongoose.model("User").findOne({ userId: req.body.userId });
    let cardName = req.body.cardName;
    if (req.body.action === "activate") {
        switch (cardName) {
            case "merchant":
                await user.updateOne({ merchant: "Approved" })
                break;
            case "worldElite":
                await user.updateOne({ worldElite: "Approved" })
                break;
            case "classic":
                await user.updateOne({ classic: "Approved" })
                break;
            case "prime":
                await user.updateOne({ prime: "Approved" })
                break;
            case "titanium":
                await user.updateOne({ titanium: "Approved" })
                break;

            default:
                break;
        }

        res.json({
            message: "Card Approved"
        });
    } else if (req.body.action === "deactivate") {
        switch (cardName) {
            case "merchant":
                await user.updateOne({ merchant: "Inactive" })
                break;
            case "worldElite":
                await user.updateOne({ worldElite: "Inactive" })
                break;
            case "classic":
                await user.updateOne({ classic: "Inactive" })
                break;
            case "prime":
                await user.updateOne({ prime: "Inactive" })
                break;
            case "titanium":
                await user.updateOne({ titanium: "Inactive" })
                break;

            default:
                break;
        }
        res.json({
            message: "Card Deactivated"
        })
    } else if (req.body.action === "pending") {
        switch (cardName) {
            case "merchant":
                await user.updateOne({ merchant: "Pending" })
                break;
            case "worldElite":
                await user.updateOne({ worldElite: "Pending" })
                break;
            case "classic":
                await user.updateOne({ classic: "Pending" })
                break;
            case "prime":
                await user.updateOne({ prime: "Pending" })
                break;
            case "titanium":
                await user.updateOne({ titanium: "Pending" })
                break;

            default:
                break;
        }
        res.json({
            message: "Card Pending"
        })
    }


}
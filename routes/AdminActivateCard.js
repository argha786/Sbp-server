const mongoose=require("mongoose")
module.exports=function AdminActivateCard(req, res){
    /*Data received: {
        userId: userId,
        cardName: cardName
    }*/

    mongoose.model("Card").findOneAndUpdate(
        {userId: req.body.userId, name: req.body.cardName},
        {
            isActivated: true,
            isPending: false
        },
        async function(err, response){
            const user= mongoose.model("User").findOne({userId: req.body.userId});
            let cardName=req.body.cardName;

            switch (cardName) {
                case "merchant":
                    await user.updateOne({ merchant: "Approved" })
                    break;
                case "worldElite":
                    await user.updateOne({ worldElite: "Approved" })
                    break;
                case "classic":
                    await user.updateOne({classic: "Approved"})
                    break;
                case "prime":
                    await user.updateOne({prime: "Approved"})
                    break;
                case "titanium":
                    await user.updateOne({titanium: "Approved"})
                    break;

                default:
                    break;
            }
            res.send(response);
        }
    );
    
}
const mongoose=require("mongoose")
// Accepting{ userId: userId }

module.exports=async function GetUserTransaction(req, res){

    mongoose.model("Transaction").findOne(

        {userId: req.body.userId},
        function(err, response){
            res.send(response);
        }
    )


}   
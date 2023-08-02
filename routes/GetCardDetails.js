const mongoose=require("mongoose");


// Accepting { userId: userId}

module.exports=function GetCardDetials(req, res){

    mongoose.model("Card").find(
        {userId: req.body.userId},
        function(err, response){
            res.send(response);
        }
    );

}
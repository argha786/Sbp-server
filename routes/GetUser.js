const mongoose =require("mongoose")
// Accepting {userId: userId}

module.exports=function GetUser(req, res){
    mongoose.model("User").findOne(
        {userId: req.body.userId},

        function(err, response){
            res.send(response);
        }
    )
    
}
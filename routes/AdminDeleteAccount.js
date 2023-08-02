const mongoose =require("mongoose")
// Accepting {userId: userId}

module.exports=function AdminDeleteAccount(req, res){
    mongoose.model("User").findOneAndDelete(
        {userId: req.body.userId},

        function(err, response){
            res.send(response);
        }
    )
    
}
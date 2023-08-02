const mongoose =require("mongoose")


module.exports=function AdminGetAllAccountRequest(req, res){
    mongoose.model("PendingUser").find(
        function(err, response){
            
            res.send(response);
        }
    )
}
const mongoose = require("mongoose")


module.exports=function AdminGetAllRequest(req, res){
    mongoose.model("Card").find(
        function(err, response){
            
            res.send(response);
        }
    )
}
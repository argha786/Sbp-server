const mongoose=require("mongoose")


module.exports=function GetDraft(req, res){
    mongoose.model("Draft").find(
        function(err, response){
            
            res.send(response)
        }
    );
}
const mongoose=require("mongoose")


const message=new mongoose.Schema({
    message: String
})

const Message=mongoose.model("Message", message)

module.exports=function AdminMessages(req, res){
    mongoose.model("Message").find(

        
        function(err, response){
            res.send(response);
        }

    )
    
}
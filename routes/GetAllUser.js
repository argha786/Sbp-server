const mongoose = require("mongoose")


module.exports = function GetAllUserCardStatus(req, res) {

    mongoose.model("User").find(
        
        function(err, response){
            res.send(response)
        }
    );


}
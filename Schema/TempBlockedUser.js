const mongoose = require("mongoose")


const tempBlockedUser= new mongoose.Schema({
    email: String

});

const TempBlockedUser=mongoose.model("TempBlockedUser", tempBlockedUser);
module.exports=TempBlockedUser;
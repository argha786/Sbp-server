const mongoose = require("mongoose")


const blockedUser= new mongoose.Schema({
    email: String

});

const BlockedUser=mongoose.model("BlockedUser", blockedUser);
module.exports=BlockedUser;
const mongoose = require("mongoose")


const message= new mongoose.Schema({
    username: String,
    messages:[{

        message: String
    }]

});

const Message=mongoose.model("Message", message);
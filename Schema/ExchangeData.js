const mongoose = require("mongoose")


const exchangeData= new mongoose.Schema({
    id: String,
    lastOneBtcValue: Number,


});
const ExchangeData=mongoose.model("ExchangeData", exchangeData);
module.exports=ExchangeData;
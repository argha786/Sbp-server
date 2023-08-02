const mongoose=require('mongoose')


const support=new mongoose.Schema({
    subject: String,
    email: String,
    description: String,
    attachment: String,
    actionTaken: Boolean
})
const Support=mongoose.model("Support", support);
module.exports=Support;
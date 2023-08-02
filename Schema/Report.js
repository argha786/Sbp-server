const mongoose= require('mongoose')


const report = new mongoose.Schema({
    reportedBy: String,
    reportedAccount: String,
    reportReason: String,
    attachment: String,
    actionTaken: Boolean
})
const Report = mongoose.model('Report', report);
module.exports=Report;
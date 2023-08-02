const mongoose=require('mongoose')
const Report=require('../Schema/Report')

// Accepting{_id: _id}
module.exports = async function ReportActionTaken(req, res){
    Report.findOneAndDelete(

        {_id: req.body._id}
    )
    .then(()=> res.status(200).json({message: "Report set as Action Taken!"}))
    
    .catch(err=>console.log(err))


}
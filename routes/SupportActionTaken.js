const mongoose=require('mongoose')
const Support=require('../Schema/Support')

// Accepting{_id: _id}
module.exports = async function ReportActionTaken(req, res){
    Support.findOneAndDelete(

        {_id: req.body._id}
    )
    .then(()=> res.status(200).json({message: "Support set as Action Taken!"}))
    
    .catch(err=>console.log(err))


}
const mongoose=require('mongoose')
const Report= require('../Schema/Report')

module.exports=async function AdminGetAllReport(req, res){
    Report.find()
    .then( report =>{
        res.send(report)
    })
    .catch(err=> console.log(err))
}
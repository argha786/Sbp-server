const mongoose=require('mongoose')
const Support= require('../Schema/Support')

module.exports=async function AdminGetAllSupport(req, res){
    Support.find()
    .then( support =>{
        res.send(support)
    })
    .catch(err=> console.log(err))
}
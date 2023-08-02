const mongoose = require("mongoose")
// Accepting {email: email}

const TempBlockedUser = require('../Schema/TempBlockedUser')

module.exports = async function TempBlockedUserStatus(req, res) {

    let tempBlockedUser = await TempBlockedUser.findOne({email: req.body.email})
    if(tempBlockedUser){
        res.json({status: "blocked"});
    }else if(!tempBlockedUser){
        
        res.json({status: "unblocked"});
    }



}
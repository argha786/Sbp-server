const mongoose=require("mongoose")
// Accepting {email: email}

module.exports= async function CheckUserExixts(req, res){
    const userExists= await mongoose.model("User").findOne({email: req.body.email})


    if (userExists) {
        res.status(200).send("OK");
    }else{
        res.status(404).send("Email is not registered!");
    }
}
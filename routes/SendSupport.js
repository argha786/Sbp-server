const mongoose=require('mongoose')
const Support=require('../Schema/Support')

// Accepting{
//     subject: subject,
//     email: email,
//     description: description,
//     attachment: attachment
// }
module.exports= async function SendSupport(req, res){
    if (req.body.reportedBy === "" || req.body.reportedAccount === "" || req.body.reportReason === "" || req.file === undefined ) {
        res.status(202).json({ message: "Incomplete Data!" });
    } else {
        const newSupport = new Support({
            subject: req.body.subject,
            email: req.body.email,
            description: req.body.description,
            attachment: `https://${process.env.BUCKETNAME}.s3.amazonaws.com/${req.file.key}`,
            actionTaken: false
        })
        await newSupport.save()
        .then(()=>{
            res.status(200).json({message: "Supported!"})
        })
        .catch((err)=>{
            res.status(202).json({message: "Error!"})
        })
    }
}
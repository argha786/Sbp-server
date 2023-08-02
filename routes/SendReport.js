const mongoose = require('mongoose');
const Report = require('../Schema/Report')

// Accepting{
//     reportedBy: reportedBy,
//     reportedAccount: reportedAccount,
//     reportReason: reportReason,
//     attachment: attachment
// }
module.exports = async function SendReport(req, res) {


    if (req.body.reportedBy === "" || req.body.reportedAccount === "" || req.body.reportReason === "" || req.file === undefined ) {
        res.status(202).json({ message: "Incomplete Data!" });
    } else {
        const newReport = new Report({
            reportedBy: req.body.reportedBy,
            reportedAccount: req.body.reportedAccount,
            reportReason: req.body.reportReason,
            attachment: `https://${process.env.BUCKETNAME}.s3.amazonaws.com/${req.file.key}`,
            actionTaken: false
        })
        await newReport.save()
        .then(()=>{
            res.status(200).json({message: "Reported!"})
        })
        .catch((err)=>{
            res.status(202).json({message: "Error!"})
        })
    }
}
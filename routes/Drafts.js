const mongoose = require("mongoose")


const draft = new mongoose.Schema({
    draft: String
})

const Draft = new mongoose.model("Draft", draft);

module.exports = async function Drafts(req, res) {
    const newDraft = new Draft({

        draft: req.body.draft
    })
    if (req.body.draft!==null || req.body.draft!=="") {
        newDraft.save();
    } else {
        res.status(202)

    }
}
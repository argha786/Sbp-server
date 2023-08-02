const jwt = require("jsonwebtoken");
const User = require("../routes/CreateUser");
const mongoose = require("mongoose");
const authenticate = async (req, res, next) => {
  try {
    // console.log(req.headers)
    const token = req.headers["authorization"]===undefined ? req.body.token : req.headers["authorization"].split(" ")[1];
    const verifyToken = await jwt.verify(token, process.env.SECRET);
    // console.log(verifyToken)
    const rootUser = await mongoose.model("User").findOne({ _id: verifyToken._id });
    if (!rootUser) {
      throw new Error("User not Found");
    }
    req.token = token;
    req.rootUser = rootUser;
    req.userID = rootUser._id;
    next();
  } catch (err) {
    res.status(401).send("Unauthorized user");
    console.log(err);
  }
};
module.exports = authenticate;
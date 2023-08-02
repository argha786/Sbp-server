const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const adminAuthenticate = async (req, res, next) => {
  try {
    // console.log(req.headers)
    const token = req.headers["authorization"].split(" ")[1];
    const verifyToken = await jwt.verify(token, process.env.ADMINSECRET);
    // console.log(verifyToken)
    const rootUser = verifyToken._id==="admin1"
    if (!rootUser) {
      throw new Error("User not Found");
    }
    req.token = token;
    req.userID = "admin1";
    next();
  } catch (err) {
    res.status(401).send("Unauthorized user");
    console.log(err);
  }
};
module.exports = adminAuthenticate;
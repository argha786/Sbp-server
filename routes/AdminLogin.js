const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");


module.exports = async function AdminLogin(req, res) {


    const { adminUsername, password } = req.body;
    if (adminUsername === "" || password === "") {
        res.status(202).json({ message: "Incomplete Input" });
    } else {
        if (password.trim() === '') {
            return res.status(402).send({ message: "Wrong" });
        }

        if (adminUsername === process.env.ADMINUSERNAME) {

            if (password === process.env.ADMINPASS) {
                const token = await jwt.sign({ _id: "admin1" }, process.env.ADMINSECRET);
                // console.log(token);

                res.status(200).send({ message: "OK", token: token });
            }
            else {
                res.status(202).json({ message: "Wrong Credentials" });
            }
        }
        else {
            res.status(202).json({ message: "Wrong Credentials" });
        }
    }
};

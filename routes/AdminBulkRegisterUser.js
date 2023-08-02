const xlsx = require('xlsx');
const path = require('path');
const User = require('../Schema/User')
const { v4: uuidv4 } = require('uuid');
var randomize = require("randomatic")
const bcrypt = require("bcryptjs");

const  mongoose = require('mongoose');
module.exports = async function AdminBulkRegisterUser(req, res) {
    let uploadData = [];
    let uploadTransaction = [];

    if (req.file === undefined) {
        res.status(202).json({
            error: "File not found!",
            message: "Registration data file not found"
        });
    } else {
        // console.log(req.file)

        const filePath = path.join(__dirname, '../', req.file.path)
        const workbook = xlsx.readFile(filePath); // parses a file

        const dataJson = xlsx.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]])
        // console.log(dataJson)

        await dataJson.forEach(async (element) => {
            let userId = uuidv4();
            let accountNumber = randomize('0', 10);
            let password = await bcrypt.hash((element.password).toString(), 5);
            let data = {
                userId: userId,
                fName: element.fName,
                lName: element.lName,
                email: element.email,
                password: password,
                accountNumber: accountNumber,
                timedOtp: {
                    otp: "",
                    timeStamp: ""
                },
                dob: element.dob || "",
                address: element.address || "",
                postalCode: element.postalCode || "",
                country: element.country || "",
                merchant: "Inactive",
                worldElite: "Inactive",
                classic: "Inactive",
                prime: "Inactive",
                titanium: "Inactive",
                balance: 0,
                image: element.image || "",
                Id: element.Id || "",
                approvalStatus: "Approved",
                classicData: {
                    cardNumber: "",
                    expiryYear: "",
                    expiryMonth: "",
                    cvv: ""
                },
                primeData: {
                    cardNumber: "",
                    expiryYear: "",
                    expiryMonth: "",
                    cvv: ""
                }
            }
            await uploadData.push(data);

            let transaction={
                userId: userId,
                transaction:[]
            }
            await uploadTransaction.push(transaction);




            if (dataJson.length === uploadData.length) {
                await User.insertMany(uploadData).then(function () {
                    // console.log("Data inserted")  // Success
                    
                    // console.log(uploadData)

                    mongoose.model('Transaction').insertMany(uploadTransaction)
                    .then((user)=>{
                        // console.log(user)
                    })
                    .catch(err=>console.log(err))


                    res.status(200).json({ message: "Bulk User registration is sucessful" })
                    // also developer can implement code to delete that xlsx file under AdminFile/register.
                    // fs.unlink(filePath) -> code to delete that file (don't forget to import fs)
                }).catch(function (error) {
                    console.log(error)      // Failure
                    res.status(202).json({
                        error: "User registration failed!",
                        message: error
                    });
                });
            }
        })














    }
}
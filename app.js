const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
var cors = require("cors");
const multer = require("multer");
const path = require("path")

const app = express();
const auth=require('./Middleware/authenticate')
const adminAuth=require('./Middleware/adminAuthenticate')
const changePasswordAuth=require('./Middleware/changePasswordAuth')

var multerS3 = require('multer-s3')
var aws = require('aws-sdk')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.json({ limit: 1024 * 1024 * 20, type: 'application/json' }));
app.use(express.urlencoded({ extended: true, limit: 1024 * 1024 * 20, type: 'application/x-www-form-urlencoding' }));
app.use('/profile', express.static('./UserFile/images'));

app.use('/id', express.static('./UserFile/documents'));
app.use('/report', express.static('./AdminFile/reportAttachment'));
app.use('/support', express.static('./AdminFile/supportAttachment'));

const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {  //CB is a call back function
        cb(null, "./UserFile/images");
    },
    filename: (req, file, cb) => {
        // console.log(file)
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const documentStorage = multer.diskStorage({
    destination: (req, file, cb) => {  //CB is a call back function
        cb(null, "./UserFile/documents");
    },
    filename: (req, file, cb) => {
        // console.log(file)
        cb(null, Date.now() + path.extname(file.originalname));
    }
});


const adminFileStorage = multer.diskStorage({
    destination: (req, file, cb) => {  //CB is a call back function
        cb(null, "./AdminFile/register");
    },
    filename: (req, file, cb) => {
        // console.log(file)
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const reportAttachment = multer.diskStorage({
    destination: (req, file, cb) => {  //CB is a call back function
        cb(null, "./AdminFile/reportAttachment");
    },
    filename: (req, file, cb) => {
        // console.log(file)
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const supportStorage = multer.diskStorage({
    destination: (req, file, cb) => {  //CB is a call back function
        cb(null, "./AdminFile/supportAttachment");
    },
    filename: (req, file, cb) => {
        // console.log(file)
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

var s3 = new aws.S3({

    accessKeyId: process.env.ACCESSKEYID,
    secretAccessKey: process.env.SECRETACCESSKEY
})

const uploadImage = multer({ storage: imageStorage });
const uploadDocument = multer({ storage: documentStorage });
const uploadAdminBulkRegFile = multer({ storage: adminFileStorage });
const uploadReportAttachment = multer({ storage: reportAttachment });
const uploadSupportAttachment = multer({ storage: supportStorage });
var uploadS3 = multer({
    storage: multerS3({
      s3: s3,
      bucket: process.env.BUCKETNAME,
      contentType: multerS3.AUTO_CONTENT_TYPE,
    //   acl: 'public-read',
      metadata: function (req, file, cb) {
        cb(null, {fieldName: file.fieldname});
      },
      key: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
      }
    })
  })
/*==========================================<Mongoose Connection>======================================================== */

mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
    // useFindAndModify: false
}).then(() => {
    console.log("Database Connected")
}).catch((err) => {
    console.log("No Connection")
    console.log(err)
});

/*==========================================</Mongoose Connection>======================================================== */


const Home = require("./routes/Home");
const Login = require("./routes/Login");
const HandleOtp = require("./routes/HandleOtp");
const CreateUser = require("./routes/CreateUser");
const AdminLogin = require("./routes/AdminLogin")
const ResuestVerification = require("./routes/RequestVerification")
const AdminMessages = require("./routes/AdminMessages");
const Drafts = require("./routes/Drafts");
const GetDrafts = require("./routes/GetDraft");
const AdminActivateCard = require("./routes/AdminActivateCard")
const GetCardDetails = require("./routes/GetCardDetails")
const AdminGetAllRequest = require("./routes/AdminGetAllRequest")
const GetAllUser = require("./routes/GetAllUser")
const CheckUserExists = require("./routes/CheckUserExists")
const SendOtp = require("./routes/SendOtp")
const AdminActivateDeactivateControl = require("./routes/AdminActivateDeactivateControl")
const GetUser = require("./routes/GetUser")
const Withdrawal = require("./routes/Withdrawal")
const AdminBalanceControl = require("./routes/AdminBalanceControl")
const FundTransfer = require("./routes/FundTransfer")
const SignupStep1 = require("./routes/Signup/SignupStep1")
const SignupStep2 = require("./routes/Signup/SignupStep2")
const SignupStep3 = require("./routes/Signup/SignupStep3")


const AdminGetAllAccountRequest = require("./routes/AdminGetAllAccountRequest")
const AdminApproveAccount = require("./routes/AdminApproveAccount")
const AdminDispproveAccount = require("./routes/AdminDisapproveAccount")

const ChangePassword = require("./routes/ChangePassword")
const UpdateCardData = require("./routes/UpdateCardData")
const GetUserTransaction = require("./routes/GetUserTransaction")
const AdminBulkTransferAction=require("./routes/AdminBulkTransferAction")
const AdminBulkRegisterUser=require("./routes/AdminBulkRegisterUser")
const SendReport=require("./routes/SendReport")
const SendSupport=require("./routes/SendSupport");

const AdminGetAllReport=require("./routes/AdminGetAllReport")
const AdminGetAllSupport=require("./routes/AdminGetAllSupport")
const AdminReportActionTaken=require("./routes/ReportActionTaken")
const AdminSupportActionTaken=require("./routes/SupportActionTaken")
const UpdateAccount=require("./routes/UpdateAccount")



const AdminGetUser=require("./routes/AdminGetUser")
const AdminDeleteAccount=require("./routes/AdminDeleteAccount")


const AdminGetUserTransaction=require("./routes/AdminGetUserTransaction")
const AdminBlockUser=require("./routes/AdminBlockUser")
const AdminSingleUserRegister=require("./routes/AdminSingleUserRegistration")

const AdminSendInterest=require("./routes/AdminSendInterest")
const AdminTempBlockUser=require("./routes/AdminTempBlockUser")
const TempBlockedUserStatus=require("./routes/TempBlockedUserStatus")
const AdminChangePaymentAddress=require("./routes/AdminChangePaymentAddress")
const AdminGetPaymentAddress=require("./routes/AdminGetPaymentAddress")
const ExchangeDataUpdate=require("./routes/ExchangeDataUpdate")




app.get("/", Home);
app.post("/login", Login);
app.post("/handleotp", HandleOtp);
app.post("/createuser", CreateUser);
app.post("/adminlogin", AdminLogin)
app.post("/requestverification", ResuestVerification);
app.post("/adminmessages",adminAuth, AdminMessages);
app.post("/admindrafts",adminAuth, Drafts);
app.get("/getdrafts",adminAuth, GetDrafts);
app.post("/activatecard",auth, AdminActivateCard);
app.post("/getcarddetails",auth, GetCardDetails);
app.get("/admingetallrequest",adminAuth, AdminGetAllRequest);
app.get("/getalluser", GetAllUser)
app.post("/checkuserexists",auth, CheckUserExists);
app.post("/sendotp", SendOtp);
app.post("/adminactivatedeactivatecontrol",adminAuth, AdminActivateDeactivateControl);
app.post("/getuser",auth, GetUser);
app.post("/withdrawal",auth, Withdrawal);
app.post("/adminbalancecontrol",adminAuth, AdminBalanceControl)

app.post("/fundtransfer",auth, FundTransfer);
app.post("/signupstep1", uploadS3.single("image"), SignupStep1);
app.post("/signupstep2", SignupStep2);

app.post("/signupstep3", uploadS3.single("image"), SignupStep3);
app.get("/admingetallaccountrequest",adminAuth, AdminGetAllAccountRequest);
app.post("/adminapproveaccount",adminAuth, AdminApproveAccount)

app.post("/admindisapproveaccount",adminAuth, AdminDispproveAccount)
app.post("/changepassword",changePasswordAuth, ChangePassword);
app.post("/updatecarddata",adminAuth, UpdateCardData);
app.post("/getusertransaction",auth, GetUserTransaction)

app.post("/adminbulktransferaction",adminAuth, AdminBulkTransferAction);
app.post("/adminbulkregisteruser",adminAuth, uploadAdminBulkRegFile.single('file'), AdminBulkRegisterUser);
app.post("/sendreport",auth, uploadS3.single("image"), SendReport)
app.post("/sendsupport",auth, uploadS3.single("image"), SendSupport);

app.get("/admingetallreport",adminAuth, AdminGetAllReport)

app.get("/admingetallsupport",adminAuth, AdminGetAllSupport)
app.post("/adminrequestactiontaken",adminAuth, AdminReportActionTaken)
app.post("/adminsupportactiontaken",adminAuth, AdminSupportActionTaken)
app.post("/updateAccount", auth, uploadS3.single("image"), UpdateAccount)
app.post("/admingetuser", adminAuth, AdminGetUser)
app.post("/admindeleteaccount", adminAuth, AdminDeleteAccount)
app.post("/admingetusertransaction", adminAuth, AdminGetUserTransaction)
app.post("/adminblockuser", adminAuth, AdminBlockUser)

app.post("/adminsingleuserregister", adminAuth, AdminSingleUserRegister)

app.post("/adminsendinterest", adminAuth, AdminSendInterest);


app.post("/admintempblockuser", adminAuth, AdminTempBlockUser)
app.post("/tempblockeduserstatus", adminAuth, TempBlockedUserStatus)

app.post("/adminchangepaymentaddress",adminAuth, AdminChangePaymentAddress)

app.get("/admingetpaymentaddress", AdminGetPaymentAddress)

app.post("/exchangedataupdate", ExchangeDataUpdate)

//Keep heroku server awake

var http = require("http");
setInterval(function() {
    http.get("http://swiftbusinesspay457658-back.herokuapp.com");
}, 300000); // every 5 minutes (300000)


let port= process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});
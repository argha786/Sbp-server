const nodemailer=require("nodemailer");


const transporter=nodemailer.createTransport({
    service:"gmail",
    auth:{

        user: process.env.EMAIL,
        pass: process.env.PASS,
    }
});

const mailOptions={
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject: "Test",
    text: "Data"
};

transporter.sendMail(mailOptions, (err, info)=>{
    if(err){
        console.log(err);
        return;
    }
    console.log("Sent: " + info.response);
})

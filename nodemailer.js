const nodemailer=require("nodemailer");


const transporter=nodemailer.createTransport({
    service:"hotmail",
    auth:{

        user: process.env.EMAIL,
        pass: process.env.PASS,
    }
});

const options={
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject: "Test",
    text: "Data"
};

transporter.sendMail(options, (err, info)=>{
    if(err){
        console.log(err);
        return;
    }
    console.log("Sent: " + info.response);
})

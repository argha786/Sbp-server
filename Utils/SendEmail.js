const nodemailer = require("nodemailer");

module.exports = function SendEmail(head, body, emailAddress) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {

            user: process.env.EMAIL,
            pass: process.env.PASS,
        }
    });

    const options = {
        from: process.env.EMAIL,
        to: emailAddress,
        subject: "Account Status",
        html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
        <div style="margin:50px auto;width:70%;padding:20px 0">
        <img src="https://swiftbusinesspay-28551.s3.amazonaws.com/swiftBusinessPayProLogo1111.png" alt="logo" style="width: 100%" />
          <div style="border-bottom:1px solid #eee">
          </div>
          
          <p>${body}</p>
          <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${head}</h2>
          <p style="font-size:0.9em;">Regards,<br />Swiftbusinesspay Pro Team</p>
          <p style="font-size:0.9em;">Regards,<br />Copyright 2022-Swiftbusinesspay Pro-All rights reserved.</p>
          <hr style="border:none;border-top:1px solid #eee" />
          <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
       
          </div>
        </div>
      </div>`
    };

    transporter.sendMail(options, (err, info) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log("Sent: " + info.response);
    })
}
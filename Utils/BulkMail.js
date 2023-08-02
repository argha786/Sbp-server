const SibApiV3Sdk = require('sib-api-v3-sdk');


module.exports = function bulkEmail(email) {
    let defaultClient = SibApiV3Sdk.ApiClient.instance;

    let apiKey = defaultClient.authentications['api-key'];
    apiKey.apiKey = process.env.BULK_KEY;

    let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

    let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    sendSmtpEmail.subject = "Test Mail";
    sendSmtpEmail.htmlContent = `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
    <div style="margin:50px auto;width:70%;padding:20px 0">
    <img src="https://swiftbusinesspay.com/static/media/Logo.d543260aeee6b2229f21.jpg" alt="logo" style="width: 100%" />
      <div style="border-bottom:1px solid #eee">
      </div>
      
      <p>Your account has been credited please check you account dashboard. </p>
      <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">Credited!</h2>
      <p style="font-size:0.9em;">Regards,<br />Swiftbusinesspay Team</p>
      <p style="font-size:0.9em;">Regards,<br />Copyright 2022-Swiftbusinesspay-All rights reserved.</p>
      <hr style="border:none;border-top:1px solid #eee" />
      <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
   
      </div>
    </div>
  </div>`;
    sendSmtpEmail.sender = { "name": "swift business", "email": "contact.swiftbusinesspay@gmail.com" };
    //required:{email: "email"}
    sendSmtpEmail.to = email;
    // sendSmtpEmail.cc = [{"email":"example2@example2.com","name":"John Doe"}];
    // sendSmtpEmail.bcc = [{"email":"John Doe","name":"example@example.com"}];
    // sendSmtpEmail.replyTo = {"email":"replyto@domain.com","name":"John Doe"};
    // sendSmtpEmail.headers = {"Some-Custom-Name":"unique-id-1234"};
    // sendSmtpEmail.params = {"parameter":"My param value","subject":"New Subject"};

    apiInstance.sendTransacEmail(sendSmtpEmail).then(function (data) {
        console.log('mail sent successfully. Returned data: ' + JSON.stringify(data));
    }, function (error) {
        console.error(error);
    });
}


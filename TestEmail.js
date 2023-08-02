const mailchimpTx = require('@mailchimp/mailchimp_transactional')("0debd0f7ef5718e344add1fce90526b0-us14");

async function run() {
	const response = await mailchimpTx.users.ping();
	console.log(response);
}

run();









// const mailgun = require("mailgun-js");
// const DOMAIN = 'https://api.mailgun.net/v3/sandboxd9554fe9a1374d10a57db4bbc13c186d.mailgun.org';
// const mg = mailgun({apiKey: "cd9f0ee306374b162b38961956f8105e-d2cc48bc-08ffbce9", domain: DOMAIN});
// const data = {
// 	from: 'Excited User <me@samples.mailgun.org>',
// 	to: 'bar@example.com, YOU@YOUR_DOMAIN_NAME',
// 	subject: 'Hello',
// 	text: 'Testing some Mailgun awesomness!'
// };
// mg.messages().send(data, function (error, body) {
// 	console.log(body);
// });















// // using Twilio SendGrid's v3 Node.js Library
// // https://github.com/sendgrid/sendgrid-nodejs

// const sgMail = require('@sendgrid/mail')
// const APIKEY="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"
// sgMail.setApiKey(APIKEY)
// const msg = {
//   to: 'androgkp@outlook.com', // Change to your recipient
//   from: 'pabcd1111@gmail.com', // Change to your verified sender
//   subject: 'Sending with SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// }
// sgMail
//   .send(msg)
//   .then(() => {
//     console.log('Email sent')
//   })
//   .catch((error) => {
//     console.error(error)
//   })
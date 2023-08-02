const nodemailer = require("nodemailer");
const otpGenerator = require('otp-generator')

module.exports = function SendEmail(name, amount, emailAddress, address, mode) {
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
        html: `<div>
        <button onclick="window.print();return false;" >Download</button>
        <table
          border="0"
          width="100%"
          cellspacing="0"
          cellpadding="0"
          align="center"
          style="color: rgb(49, 49, 49); word-spacing: 1px; zoom: 1; height: auto"
        >
          <tbody style="height: auto">
            <tr>
              <td style="font-size: 1rem">SWIFT BUSINESS PAY&nbsp;</td>
              <td
                style="
                  font-family: 'Roboto Regular', sans-serif, sans-serif;
                  font-size: 1.125rem;
                  line-height: normal;
                  color: rgb(79, 88, 104);
                  text-align: right;
                  width: 100px;
                  height: auto;
                "
              >
                <img
                  src="https://ci4.googleusercontent.com/proxy/vZlp9HXXAs3CrZ738SY9Yuo5nV67KKc8FQnEeAhOgrExRGHjGqZiUBERiJWke1hLgEwaAIWiNLAv7fZDYOt9zm-1zWAKnsBUV_CH6PUF=s0-d-e1-ft#https://static.zebpay.com/email-template/icon-initiated.png"
                  alt=""
                  style="float: left; margin: 0px 5px"
                  class="CToWUd"
                />Initiated
              </td>
            </tr>
          </tbody>
        </table>
        <table
          border="0"
          width="100%"
          cellspacing="0"
          cellpadding="0"
          align="center"
          style="color: rgb(49, 49, 49); word-spacing: 1px; zoom: 1"
        >
          <tbody>
            <tr>
              <td
                align="center"
                valign="middle"
                style="
                  height: 230px;
                  padding: 30px;
                  background-image: url('https://ci5.googleusercontent.com/proxy/nlDibTp8p_vEK5hawHcJ2vmCLx15rgKajV5L_Iwpmz8T2uvRxOv5zVwMFYI4CkANRtet1PEW16UFe6QdEAFOJJhfXTm6qjHrtA=s0-d-e1-ft#https://static.zebpay.com/email-template/banner-bg.png');
                  background-color: rgb(32, 114, 239);
                  border-top-left-radius: 20px;
                  border-top-right-radius: 20px;
                  border-bottom-right-radius: 0px;
                  border-bottom-left-radius: 0px;
                  background-position: center top;
                  background-repeat: no-repeat no-repeat;
                "
              >
                <img
                  src="https://ci3.googleusercontent.com/proxy/Hw7DHt3C0GwoNRWaZ3GMM-a8U6SXUob8scgplaiqZseDGen_qahKczNHag0rdC8ypYF3avo9yEr-z92SF9zoaF9J_CRAhz7AHJANbdPtEfW2LDW_6A=s0-d-e1-ft#https://static.zebpay.com/email-template/icon-withdrawal_order.png"
                  alt=""
                  border="0"
                  style="
                    display: inline-block;
                    vertical-align: middle;
                    margin: 0px 15px;
                  "
                  class="CToWUd"
                />&nbsp;
                <div
                  style="
                    font-family: Roboto, Arial, sans-serif;
                    line-height: 1.2;
                    color: rgb(255, 255, 255);
                    vertical-align: middle;
                    display: inline-block;
                    text-align: left;
                  "
                >
                  <span style="font-size: 1.875rem">Withdrawal Order</span
                  ><br /><font size="5">${otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false })}</font>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <table
          border="0"
          width="100%"
          cellspacing="0"
          cellpadding="0"
          align="center"
          style="color: rgb(49, 49, 49); word-spacing: 1px; zoom: 1"
        >
          <tbody>
            <tr>
              <td
                valign="top"
                style="
                  font-family: 'Roboto Semibold', sans-serif;
                  font-size: 1.875rem;
                  color: rgb(79, 88, 104);
                "
              >
                ${name},
              </td>
            </tr>
            <tr>
              <td
                valign="top"
                style="
                  font-size: 1.875rem;
                  line-height: normal;
                  padding: 15px 0px;
                "
              >
                <span
                  style="
                    color: rgb(79, 88, 104);
                    font-family: 'Roboto Regular', sans-serif;
                    font-size: 1.875rem;
                  "
                  >We have received your request for withdrawal of&nbsp;</span
                ><span style="font-size: 1.875rem"
                  ><font
                    color="#2072ef"
                    face="Roboto Semibold, sans-serif"
                    style="font-size: 1.875rem"
                    >$ ${amount}</font
                  ></span
                >
              </td>
            </tr>
            <tr>
              <td
                valign="top"
                style="
                  font-family: 'Roboto Regular', sans-serif;
                  font-size: 1rem;
                  color: rgb(79, 88, 104);
                "
              >
                You will receive the funds in your ${mode} account 
                with&nbsp;${address} within 2 working days
              </td>
            </tr>
            <tr>
              <td
                height="50"
                style="font-size: 0px; line-height: 0px; height: 50px"
              >
                &nbsp;
              </td>
            </tr>
            <tr>
              <td
                height="1"
                style="
                  font-size: 0px;
                  line-height: 0px;
                  height: 1px;
                  border-bottom-width: 3px;
                  border-bottom-style: dotted;
                  border-bottom-color: rgb(220, 228, 237);
                  margin: 100px;
                "
              >
                &nbsp;
              </td>
            </tr>
            <tr>
              <td
                height="50"
                style="font-size: 0px; line-height: 0px; height: 50px"
              >
                &nbsp;
              </td>
            </tr>
            <tr>
              <td>
                <table
                  border="0"
                  width="100%"
                  cellspacing="0"
                  cellpadding="0"
                  align="center"
                  style="zoom: 1"
                >
                  <tbody>
                    <tr>
                      <td width="25%">
                        <table
                          border="0"
                          width="100%"
                          cellspacing="0"
                          cellpadding="0"
                          align="center"
                          style="zoom: 1"
                        >
                          <tbody>
                            <tr>
                              <td
                                valign="top"
                                style="
                                  font-family: 'Roboto Regular', sans-serif;
                                  font-size: 0.875rem;
                                  line-height: normal;
                                  color: rgb(176, 191, 209);
                                "
                              >
                                Amount
                              </td>
                            </tr>
                            <tr>
                              <td
                                valign="top"
                                style="
                                  font-family: 'Roboto Regular', sans-serif;
                                  font-size: 1.25rem;
                                  line-height: 42px;
                                  color: rgb(79, 88, 104);
                                "
                              >
                                $${amount}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                      <td align="center" valign="center" width="10%">
                        <img
                          src="https://ci6.googleusercontent.com/proxy/W5lE8ylbl1VC3ulVdVHaDZjBZOC7C8kWPToOsiC_r0MPMeRx3pxnOTJBrX125JP1Qfo1dhkEie3TzIoR_tUZoa0-rf6hD-JHKzJt=s0-d-e1-ft#https://static.zebpay.com/email-template/arrow-right.png"
                          alt=""
                          class="CToWUd"
                        />
                      </td>
                      <td width="25%">
                        <table
                          border="0"
                          width="100%"
                          cellspacing="0"
                          cellpadding="0"
                          align="center"
                          style="zoom: 1"
                        >
                          <tbody>
                            <tr>
                              <td
                                valign="top"
                                style="
                                  font-family: 'Roboto Regular', sans-serif;
                                  font-size: 0.875rem;
                                  line-height: normal;
                                  color: rgb(176, 191, 209);
                                "
                              >
                                Withdrawal Fees
                              </td>
                            </tr>
                            <tr>
                              <td
                                valign="top"
                                style="
                                  font-family: 'Roboto Regular', sans-serif;
                                  font-size: 1.25rem;
                                  line-height: 42px;
                                  color: rgb(79, 88, 104);
                                "
                              >
                                $ ${(parseInt(amount)*1.32/100)}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                      <td align="center" valign="center" width="10%">
                        <img
                          src="https://ci6.googleusercontent.com/proxy/W5lE8ylbl1VC3ulVdVHaDZjBZOC7C8kWPToOsiC_r0MPMeRx3pxnOTJBrX125JP1Qfo1dhkEie3TzIoR_tUZoa0-rf6hD-JHKzJt=s0-d-e1-ft#https://static.zebpay.com/email-template/arrow-right.png"
                          alt=""
                          class="CToWUd"
                        />
                      </td>
                      <td width="25%">
                        <table
                          border="0"
                          width="100%"
                          cellspacing="0"
                          cellpadding="0"
                          align="center"
                          style="zoom: 1"
                        >
                          <tbody>
                            <tr>
                              <td
                                valign="top"
                                style="
                                  font-family: 'Roboto Regular', sans-serif;
                                  font-size: 0.875rem;
                                  line-height: normal;
                                  color: rgb(176, 191, 209);
                                "
                              >
                                Total Receivable
                              </td>
                            </tr>
                            <tr>
                              <td
                                valign="top"
                                style="
                                  font-family: 'Roboto Regular', sans-serif;
                                  font-size: 1.25rem;
                                  line-height: 42px;
                                  color: rgb(32, 114, 239);
                                "
                              >
                                $ ${amount}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td
                height="20"
                style="font-size: 0px; line-height: 0px; height: 20px"
              >
                &nbsp;
              </td>
            </tr>
            <tr>
              <td
                valign="top"
                style="
                  font-family: 'Roboto Regular', sans-serif;
                  font-size: 0.875rem;
                  line-height: normal;
                  color: rgb(176, 191, 209);
                "
              >
                *Your bank may charge you additional fees for receiving funds
                
              </td>
            </tr>
            <tr>
              <td
                valign="top"
                style="
                  font-family: 'Roboto Regular', sans-serif;
                  font-size: 0.875rem;
                  line-height: normal;
                  color: rgb(176, 191, 209);
                "
              >
                *Fees amount includes Tax
              </td>
            </tr>
            <tr>
              <td
                valign="top"
                style="
                  font-family: 'Roboto Regular', sans-serif;
                  font-size: 0.875rem;
                  line-height: normal;
                  color: rgb(176, 191, 209);
                "
              >
                *This is not tax invoice
              </td>
            </tr>
            <tr>
              <td
                height="30"
                style="font-size: 0px; line-height: 0px; height: 30px"
              >
                &nbsp;
              </td>
            </tr>
            <tr>
              <td
                height="1"
                style="
                  font-size: 0px;
                  line-height: 0px;
                  height: 1px;
                  border-bottom-width: 3px;
                  border-bottom-style: dotted;
                  border-bottom-color: rgb(220, 228, 237);
                  margin: 100px;
                "
              >
                &nbsp;
              </td>
            </tr>
            <tr>
              <td
                height="50"
                style="font-size: 0px; line-height: 0px; height: 50px"
              >
                &nbsp;
              </td>
            </tr>
            <tr>
              <td
                valign="top"
                style="
                  font-family: 'Roboto Regular', sans-serif;
                  font-size: 1rem;
                  line-height: normal;
                  color: rgb(79, 88, 104);
                "
              >
                When your withdrawal order is successfully processed, you will
                receive confirmation for the same
              </td>
            </tr>
            <tr>
              <td
                height="50"
                style="font-size: 0px; line-height: 0px; height: 50px"
              >
                &nbsp;
              </td>
            </tr>
            <tr>
              <td
                align="center"
                valign="top"
                style="
                  padding: 30px;
                  border-top-left-radius: 15px;
                  border-top-right-radius: 15px;
                  border-bottom-right-radius: 15px;
                  border-bottom-left-radius: 15px;
                "
              >
                <table
                  border="0"
                  width="100%"
                  cellspacing="0"
                  cellpadding="0"
                  align="center"
                  style="zoom: 1; height: auto"
                >
                  <tbody style="height: auto">
                    <tr>
                      <td style="padding: 0px 30px 0px 0px">
                        <img
                          src="https://ci3.googleusercontent.com/proxy/HyGhTIIyZR8y4HigZ5cOxmdlEptAI3NggVaP0ISarUKyd7MQrh_ajWgEHY-z7dWuMeLNzuPS_jZTsCfDvbiJKlC41rpCrpJA6Q=s0-d-e1-ft#https://static.zebpay.com/email-template/icon-info.png"
                          alt=""
                          class="CToWUd"
                        />
                      </td>
                      <td
                        valign="top"
                        style="
                          font-family: 'Roboto Regular', sans-serif;
                          font-size: 1rem;
                          line-height: normal;
                          color: rgb(79, 88, 104);
                          height: auto;
                        "
                      >
                        If you did not initiate this transaction, please contact
                        our support team immediately at&nbsp;<a
                          href="mailto:support@swiftbusinesspay.com"
                          style="font-size: 1rem"
                          target="_blank"
                          >support@swiftbusinesspay.<wbr />com</a
                        >
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="yj6qo"></div>
        <div class="adL"></div>
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
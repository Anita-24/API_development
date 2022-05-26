// const OTP = require("../models/otp");
const fast2sms = require("fast-two-sms");
const number = Math.floor(Math.random() * 1000000 + 1);

async function sendTextMessage() {
  const accountSid = "ACbe455a3282f28acd00421eec919af44f";
  const authToken = "cea2e8c0fae3ea75f8f6e39380881f22";
  const client = require("twilio")(accountSid, authToken);
  await client.messages
    .create({
      body: `Please verify your account using OTP ${number} given in the box. `,
      to: "+919205542283",
      from: "+12564881484",
    })
    .then((message) => console.log(message))
    .catch((err) => console.log(err));
}

async function sendOtpMsg() {
  try {
    var options = {
      authorization:
        "J0KWDs9r5GtmxbFSI7YBULZ4zighVo3Q8eywcTONApHR2duEMXlko7jJiZ48dxwMNbsqLWDryGHezXCB",
      message: `Please verify your account using OTP ${number} given in the box. `,
      numbers: ["9205542283"],
    };
    const response = await fast2sms.sendMessage(options);
    console.log("response", response);
  } catch (error) {
    console.log("errrorrrrrrr", error);
  }
}

// sendOtpMsg();

// module.exports = {
//   sendTextMessage,
//   sendOtpMsg,
// };

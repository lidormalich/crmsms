const { updateSMS } = require("../service/updateSMS");
const { default: axios } = require("axios");

const smsApiOptions = { headers: { "content-type": "application/json" } };

/**
 * Check SMS balance from sms4free API
 */
const getSmsBalance = async (apiKey, username, password) => {
  const requestPayload = { key: apiKey, user: username, pass: password };
  try {
    const response = await axios.post(
      "https://api.sms4free.co.il/ApiSMS/AvailableSMS",
      requestPayload,
      smsApiOptions
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch SMS balance:", error);
    return 0;
  }
};

/**
 * Send SMS using Twilio (legacy)
 */
exports.sendSmsTwilio = async (req, res) => {
  try {
    const accountSid = process.env.ASID || "";
    const authToken = process.env.TOKEN || "";
    const client = require("twilio")(accountSid, authToken);
    const { message, phone, eventId } = req.body;
    const twilioResponse = await client.messages.create({
      body: message,
      from: "+12762849386",
      to: phone,
    });
    if (twilioResponse.errorCode == null) {
      res.status(202).send("Sended");
    } else {
      res.status(404).send("Something broke! Error");
    }
    updateSMS(eventId, phone);
  } catch (error) {
    console.error("Twilio SMS error:", error);
    res.status(500).send("Failed to send SMS via Twilio");
  }
};

/**
 * Send SMS using sms4free API
 */
exports.sendSms = async (req, res) => {
  const smsApiKey = process.env.sms4freeKEY || "";
  const username = process.env.user || "";
  const password = process.env.pass || "";
  const sender = "CRMSMS";
  const { message, phone, eventId } = req.body;
  const recipient = phone;

  const requestPayload = {
    key: smsApiKey,
    user: username,
    pass: password,
    sender,
    recipient,
    msg: message,
  };

  try {
    const balance = await getSmsBalance(smsApiKey, username, password);
    console.log("SMS balance:", balance);
    await axios.post(
      "https://api.sms4free.co.il/ApiSMS/SendSMS",
      requestPayload,
      smsApiOptions
    );
    res.status(200).send("Sended");
    updateSMS(eventId, phone);
  } catch (error) {
    console.error("sms4free send error:", error);
    res.status(404).send("Failed to send SMS");
  }
};

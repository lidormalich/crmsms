const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const smsController = require("../controllers/smsController");
const { updateSMS } = require("../service/updateSMS");
const { default: axios } = require("axios");

const options = { headers: { "content-type": "application/json" } };

const check = async (key, user, pass) => {
  let requesteObject = { key, user, pass };
  let balance = 0;
  try {
    let ApiSMS = await axios.post(
      "https://api.sms4free.co.il/ApiSMS/AvailableSMS",
      requesteObject,
      options
    );
    balance = ApiSMS.data;
  } catch (error) {
    console.log(error);
  }
  return balance;
};

// Send SMS using Twilio (legacy)
router.post("/OLD", auth, smsController.sendSmsTwilio);

// Send SMS using sms4free API
router.post("/", auth, smsController.sendSms);

module.exports = router;

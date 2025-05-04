const SMS = require('../models/smsmodel');

module.exports.updateSMS = async function (eventId, phoneNumber) {
    try {
        const updatedSMS = await SMS.findOneAndUpdate(
            { eventId: eventId },
            { $push: { smsSendTo: { phoneNumber, status: "send" } } },
            { new: true } // מחזיר את המסמך המעודכן
        );
        return updatedSMS.smsSendTo;
    } catch (err) {
        console.error("Error updating SMS:", err);
        throw err;
    }
};
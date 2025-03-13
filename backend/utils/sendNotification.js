const twilio = require('twilio');
require('dotenv').config();  // Import and load environment variables from the .env file

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

// Function to send WhatsApp notification
const sendWhatsAppNotification = (contactNumber, message) => {
    client.messages.create({
        from: 'whatsapp:+14155238886',  // Twilio sandbox number
        to: `whatsapp:${contactNumber}`,
        body: message,
    })
    .then(message => console.log('WhatsApp message sent: ', message.sid))
    .catch(error => console.error('Error sending WhatsApp message:', error));
};

module.exports = sendWhatsAppNotification;
//hjhjhjhjj
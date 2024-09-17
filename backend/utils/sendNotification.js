const twilio = require('twilio');

// Twilio credentials (replace with your own)
const accountSid = 'AC896325c7ef10343ef31c35cbd119839d';
const authToken = '719761c78f8b2e404b3896822e4e2624';
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

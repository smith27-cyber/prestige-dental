const nodemailer = require('nodemailer');

// Set up a transporter (using Gmail as an example)
const transporter = nodemailer.createTransport({
    service: 'gmail',  // You can use other email services as well (e.g., Outlook, Yahoo)
    auth: {
        user: 'paulsmle27@gmail.com',  // Your email address
        pass: '_Leahsm27._'    // Your email password (or app-specific password if using Gmail)
    }
});

// Function to send email notification
const sendEmailNotification = (recipientEmail, subject, text) => {
    const mailOptions = {
        from: 'your-email@gmail.com',     // Sender email address
        to: recipientEmail,               // Recipient email address
        subject: subject,                 // Subject of the email
        text: text                        // Email body text
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};

module.exports = sendEmailNotification;

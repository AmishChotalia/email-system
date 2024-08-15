const sgMail = require('../config/sendGrid');
const Email = require('../models/email');

async function sendMail(email) {
    try {
        await sgMail.send({
            to: email.recipient,
            from: email.sender,
            subject: email.subject,
            text: email.body
        });
        email.status = 'sent';
    } catch (error) {
        console.error('Email sending failed:', error);
        email.status = 'failed';
    }
    await email.save();
}

module.exports = { sendMail };

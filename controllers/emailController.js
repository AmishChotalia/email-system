const Email = require('../models/email');
const queue = require('../utils/queue');

async function composeEmail(req, res) {
    try {
        const { sender, recipient, subject, body } = req.body;

        const newEmail = new Email({
            sender,
            recipient,
            subject,
            body,
            status: 'pending'
        });

        await newEmail.save();
        queue.addEmailToQueue(newEmail._id);
        res.status(200).json({ message: 'Email composed and added to queue.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getEmailStatus(req, res) {
    try {
        const email = await Email.findById(req.params.id);
        if (!email) {
            return res.status(404).json({ message: 'Email not found' });
        }
        res.status(200).json(email);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { composeEmail, getEmailStatus };

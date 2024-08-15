const fs = require('fs');
const path = require('path');
const Email = require('../models/email');
const { sendMail } = require('./emailSender');

const queueFilePath = path.join(__dirname, 'queue.json');

function readQueue() {
    if (!fs.existsSync(queueFilePath)) {
        fs.writeFileSync(queueFilePath, JSON.stringify([]));
    }
    const queueData = fs.readFileSync(queueFilePath);
    return JSON.parse(queueData);
}

function writeQueue(queue) {
    fs.writeFileSync(queueFilePath, JSON.stringify(queue));
}

function addEmailToQueue(emailId) {
    const queue = readQueue();
    if (!queue.includes(emailId)) { // Avoid adding duplicates
        queue.push(emailId);
        writeQueue(queue);
    }
}

async function processQueue() {
    try {
        const queue = readQueue();
        if (queue.length === 0) return; // Exit if queue is empty

        const failedEmails = [];

        for (const emailId of queue) {
            try {
                const email = await Email.findById(emailId);
                if (email && email.status === 'pending') {
                    await sendMail(email);
                    // Status update handled in sendMail function
                }

                // Email status saved by sendMail function
                if (email.status === 'failed') {
                    // Add failed email back to the queue
                    failedEmails.push(emailId);
                }
            } catch (error) {
                console.error(`Error processing email with ID ${emailId}:`, error);
                // Add to failed list if there's an error in processing
                failedEmails.push(emailId);
            }
        }

        // Save failed emails back to the queue
        writeQueue(failedEmails);

    } catch (error) {
        console.error('Error during queue processing:', error);
    }
}

module.exports = { addEmailToQueue, processQueue };

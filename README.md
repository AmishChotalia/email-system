# Email Notification System

## Overview

This is an email notification system built using Node.js, MongoDB, and SendGrid. It allows users to compose and send emails asynchronously with a queue system for handling email sending.

## Features

- **Compose Emails**: Users can compose emails and add them to the queue.
- **Asynchronous Sending**: Emails are sent asynchronously using a queue system.
- **Status Updates**: Users can check the status of sent emails.

## Setup

1. Clone the repository:

git clone https://github.com/AmishChotalia/email-system.git


cd email-notification-system


2. Install dependencies:

npm install

3. Set up your environment variables in a `.env` file:

SENDGRID_API_KEY=your_sendgrid_api_key


MONGODB_URI=mongodb://localhost:27017/emailNotificationSystem


PORT=3000

4. Start the application:
npm start


## Endpoints

- `POST /api/email/compose`: Compose and queue an email.
- `GET /api/email/status/:id`: Check the status of a queued email.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

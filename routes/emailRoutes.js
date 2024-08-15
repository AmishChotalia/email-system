const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController');

router.post('/compose', emailController.composeEmail);
router.get('/status/:id', emailController.getEmailStatus);

module.exports = router;

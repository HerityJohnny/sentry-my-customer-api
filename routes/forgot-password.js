const express = require('express');
const { forgotpassword } = require('../controllers/forgot-password');
const router = express.Router();

router.post('/forgotpassword', forgotpassword);

module.exports = router; 
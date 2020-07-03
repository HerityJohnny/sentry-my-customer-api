const express = require('express');
const forgetpassControl = require('../controllers/forgot-password');
const router = express.Router();

router.post('/forgotpassword/:id',forgetpassControl.forgotPassword);

module.exports = router; 
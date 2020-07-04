const express = require('express');
const { resetPassword } = require('../controllers/reset-password');
const router = express.Router();

    router.patch('/resetpassword', resetPassword);

module.exports = router;
const express = require('express');
const Auth = require('../auth/auth');
const resetPassword = require('../controllers/reset-password');
const router = express.Router();

    router.patch('/resetpassword', Auth, resetPassword.resetpassword);

module.exports = router;
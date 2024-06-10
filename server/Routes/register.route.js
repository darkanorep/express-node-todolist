const express = require('express');
const router = express.Router();
const { validateRegister, register } = require("../Controllers/AuthController/register.controller");

router.post('/', validateRegister, register);

module.exports = router;
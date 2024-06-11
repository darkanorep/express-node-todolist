const express = require('express');
const router = express.Router();

const { login} = require("../Controllers/AuthController/login.controller");

router.post('/', login);

module.exports = router;
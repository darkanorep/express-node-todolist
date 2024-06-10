const express = require('express');
const router = express.Router();
const taskRoutes = require('./task.route');
const registerRoute = require('./register.route');
const loginRoute = require('./login.route');

router.use('/register', registerRoute);
router.use('/login', loginRoute);
router.use('/tasks', taskRoutes);


module.exports = router;

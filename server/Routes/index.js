const express = require('express');
const router = express.Router();
const taskRoutes = require('./task.route');
const registerRoute = require('./register.route');
const loginRoute = require('./login.route');
// const app = require("@forkjs/group-router");
const { authenticate } = require('../Middlewares/auth.middleware');

router.use('/register', registerRoute);
router.use('/login', loginRoute);
router.use('/tasks', authenticate, taskRoutes);

// router.use('register', registerRoute);
// router.use('login', loginRoute);
// app.group('/', (router) => {
//     router.use('tasks', taskRoutes);
// }, authenticate);


module.exports = router;

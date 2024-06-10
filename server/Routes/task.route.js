const express = require('express');
const { getTask, createTask, validateTask, getSpecificTask, updateTask, deleteTask } = require("../Controllers/TaskController/task,controller");
const router = express.Router();

router.get('/', getTask);
router.post('/', validateTask, createTask);
router.get('/:id', getSpecificTask);
router.put('/:id', validateTask, updateTask);
router.delete('/:id', deleteTask);

module.exports = router;
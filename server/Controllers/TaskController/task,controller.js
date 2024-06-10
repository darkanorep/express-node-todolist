const express = require('express');
const app = express();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getTask = async (req, res) => {
        const tasks = await prisma.task.findMany();

        try {

            if (tasks.length === 0) {
                res.json({
                    message: 'No tasks found',
                }, 404);
            } else {
                res.json(tasks);
            }

        } catch (error) {
            res.status(500).json({ error: 'Something went wrong' });
        }
}
const createTask = async (req, res) => {
    const { title } = req.body;

    try {

        const task = await prisma.task.create({
            data: {
                'title': title,
            }
        });

        res.json(task);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
}
const getSpecificTask = async (req, res) => {
    const { id } = req.params;

    try {
        const task = await prisma.task.findUnique({
            where: {
                id: parseInt(id)
            }
        });

        if (!task) {
            res.json({
                message: 'Task not found',
            }, 404);
        } else {
            res.json(task);
        }
    }catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
}
const updateTask = async (req, res) => {
    req.params.id = parseInt(req.params.id);
    const { title } = req.body;

    try {
        const task = await prisma.task.findFirst({
            where: {
                id: req.params.id
            }
        });

        if (!task) {
            res.json({
                message: 'Task not found',
            }, 404);
        } else {
            const updatedTask = await prisma.task.update({
                where: {
                    id: req.params.id
                },
                data: {
                    title: title
                }
            });

            res.json(updatedTask);
        }
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
}
const deleteTask = async (req, res) => {
    const { id } = parseInt(req.params.id)

    try {

        const task = await prisma.task.findFirst({
            where: {
                id: id
            }
        });

        if (!task) {
            res.json({
                message: 'Task not found',
            }, 404);
        } else {

            await prisma.task.delete({
                where: {
                    id : task.id
                }
            });

            res.json({
                message: 'Task deleted successfully',
            });
        }

    }catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
}
async function validateTask(req, res, next) {
    const { title } = req.body;
    const { id } = req.params; // get the id from the request parameters

    if (!title) {
        return res.status(400).json({
            message: 'Title is required',
        });
    }

    const existingTask = await prisma.task.findFirst({
        where: {
            title,
            id: {
                not: parseInt(id) || undefined
            }
        }
    });

    if (existingTask) {
        return res.status(400).json({
            message: 'Task already exists',
        });
    }

    next();
}

module.exports = {
    validateTask : validateTask,
    getTask : getTask,
    createTask : createTask,
    getSpecificTask : getSpecificTask,
    updateTask : updateTask,
    deleteTask : deleteTask
}
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

async function validateRegister(req, res, next) {

    const { username } = req.body;
    const id = parseInt(req.params.id);

    if (!username) {
        return res.status(400).json({ message: 'Username is required' });
    }

    const existingUser = await prisma.user.findFirst({
        where: {
            username: username,
            id: {
                not: parseInt(id) || undefined
            }
        }
    });

    if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
    }

    next();
}

const register = async (req, res) => {
   const { username, password } = req.body;

    try {
         const user = await prisma.user.create({
              data: {
                username: username,
                password: bcrypt.hashSync(password, 10)
              }
         });

         res.json({
              message: 'User created successfully'
         });

    } catch (error) {
         res.status(500).json({ error: 'Something went wrong' });
    }
}


module.exports = {
    validateRegister : validateRegister,
    register : register
}
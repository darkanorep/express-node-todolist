const express = require('express');
const app = express();
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

const login = async (req, res) => {
    const { username, password } = req.body;
    const user = await prisma.user.findFirst({
        where: {
            username: username
        }
    });

    if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
    } else {
        const passwordMatch = bcrypt.compareSync(password, user.password);
        if (passwordMatch) {
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '10h' });
            const id = user.id;

            res.status(200).json({ token, id });
        } else {
            res.status(400).json({ message: 'Invalid credentials' });
        }
    }

}

module.exports = {
    login: login
}
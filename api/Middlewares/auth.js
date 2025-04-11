import jwt from 'jsonwebtoken';
import express from 'express';  
import { PrismaClient } from '@prisma/client';  

const JWT_SECRET = process.env.JWT_SECRET;

const router = express.Router();
const prisma = new PrismaClient();

export const auth = (req, res, next) => {
    const token = req.headers['authorization']?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        req.userid = decoded.id;
    } catch (error) {
        return res.status(400).json({ error: 'Invalid token.' });
    }
    next();
};

router.get('/list-user', async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    } catch (error) {
        console.error('Erro ao listar usuários:', error);
        res.status(500).json({ error: error.message });
    }
});

export default router;
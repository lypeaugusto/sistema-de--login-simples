import express from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();
const router = express.Router();

const jwtSecret = process.env.JWT_SECRET;

router.post('/cadastro', async (req, res) => {
    try {
        const user = req.body;
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(user.password, 10);

        const newUser = await prisma.user.create({
            data: {
                name: user.name,
                email: user.email,
                password: hash,
            },
        });

        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar usuário' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const user = req.body;
        const userdb = await prisma.user.findUnique({
            where: {
                email: user.email,
            }
        });
        if (!userdb) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        const match = await bcrypt.compare(user.password, userdb.password);
        if (!match) {
            return res.status(401).json({ error: 'Senha inválida' });
        }

        const token = jwt.sign({ id: userdb.id }, jwtSecret, { expiresIn: '1d' });

        res.status(200).json({ message: 'Login efetuado com sucesso', token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export default router;
import express from 'express';  
import { PrismaClient } from '@prisma/client';  

const router = express.Router();
const prisma = new PrismaClient();

router.get('/list-user', async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
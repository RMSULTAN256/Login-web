import express from 'express';
import { verifyToken } from './verify.js';

const router = express.Router();

router.get('/', verifyToken, (req, res) => {
    res.json({ message: `Welcome to dashboard, ${req.user.username}`});
});

export default router;
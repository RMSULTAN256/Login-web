import express from 'express';
import { body, validationResult } from 'express-validator';
import cors from 'cors';
import mysql from 'mysql';
import helmet from 'helmet';

const app = express();
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(helmet.xssFilter());

app.get('/page', (req, res) => {
    const userInput = req.body.input;
    const sanitizedInput = sanitize(userInput);

})
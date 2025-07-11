import mysql from 'mysql';
import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cust'
})

db.connect(err => {
    if (err) throw err;
    console.log('Connected!')
});

app.post('/api/users', async (req, res) => {
    console.log(req.body);
    const { username, email, password } = req.body;

    if (!username || !email || !password) return res.status(400).json({ error: 'All fields are required' })
    
     try {
        const handlePassword = await bcrypt.hash(password, 10);
        const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
        db.query(sql, [username, email, handlePassword], (err, result) => {
            if (err) return res.status(500).json({ error: 'Database error', details: err});
            res.status(201).json({ message: 'Database Saved', id: result.insertId});
        });

     } catch (error) {
        console.error('hasing error:', error);
        res.status(500).json({ error: 'Internal server error'});
     }
});

app.listen(5000, () => console.log('Server running on http://localhost:5000/api/users'));
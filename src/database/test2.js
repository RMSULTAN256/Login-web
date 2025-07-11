import mysql from 'mysql';
import bcrypt from 'bcrypt';
import express from 'express';
import cors from 'cors';

const db =  mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cust'
});

const app = express();
app.use(cors());
app.use(express.json());

db.connect(err => {
    if (err) throw err;
    console.log('database connected');
});

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const sql = 'SELECT * FROM users WHERE username = ?';
        db.query(sql, [username], async (err, result) => {
        if (err) throw err;

        if (result.length === 0) {
            res.status(401).json({ message: 'User not registered'});
            return;
        }

        const  users = result[0];
        console.log(users.password);

        const isMatch = await bcrypt.compare(password, users.password); 

        if (!isMatch) {
            res.status(401).json({ message: "Login failed. Invalid Username or password. "});
            return;
        }
        res.status(200).json({ message: 'Login success. Welcome'})
    });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Internal server error'
        })
    };

});

app.listen(5000, () => console.log('server online'));
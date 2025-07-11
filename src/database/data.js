import mysql from 'mysql';
import bcrypt from 'bcrypt';

async function dban(username, email, password) {

    const db = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'cust'
    });

    db.connect(e => {
        if (e) throw e;
        console.log('Connected!')
    });

    try {
        const passwordhashed = await bcrypt.hash(password, 10);
        const sql = 'INSERT INTO users (username, email, password) VALUE (?,?,?)';
        db.query(sql, [username, email, passwordhashed], (err, result) => {
            if (err) throw err;
            console.log('DataSaved', result.insertId)
        });
        db.end();
    } catch (error) {
        console.error(error)
        db.end();
    }
    
}

export default dban;
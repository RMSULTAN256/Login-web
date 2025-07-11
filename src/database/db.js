import mysql from 'mysql';
import bcrypt from 'bcrypt';

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

const username = "niggwrawra222a";
const email = "su222awrawr22@gmail.com";
const password = '12415251';

try {
    const passwordhased = await bcrypt.hash(password, 10);
    const sql = 'INSERT INTO users (username, email, password) VALUE (?,?,?)';
    db.query(sql, [username, email, passwordhased], (err, result) => {
        if (err) throw err;
        console.log('DataSaved', result.insertId)
    });

} catch (error) {
    console.error(error)
    console.log('there something wronggg')
};

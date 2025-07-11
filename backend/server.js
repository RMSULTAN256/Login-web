import  express  from 'express';
import cors from 'cors';

const app = express();
const port = 5002;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: "Hello nigga"})
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

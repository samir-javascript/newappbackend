import express from "express"
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import cors from "cors"
const app = express()
const PORT = 5000;
dotenv.config()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.get('/', (req, res) => {
    res.send('hello world 2024 is coming soon');
});


app.listen(PORT, () => console.log(`APP IS RUNNING ON PORT ${PORT}`));
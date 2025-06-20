import express from 'express';
import dotenv from 'dotenv';
import loginRoutes from './routes/login.routes.js';
import pool from './database/db.js';
import cors from 'cors'
dotenv.config();
const app = express();
app.use(cors())
app.use(express.json());
app.use('/api', loginRoutes);

const [result] = await pool.query('SELECT * FROM users')
console.log(result);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

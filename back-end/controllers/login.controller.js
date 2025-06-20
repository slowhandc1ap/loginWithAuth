import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import pool from '../database/db.js'
import dotenv from 'dotenv'
dotenv.config()
const JWT_SECRET = process.env.JWT_SECRET;

export const register = async (req, res) => {

    try {
        const { name, email, password , role } = req.body
        console.log(role);
        
        const [users] = await pool.query('SELECT * FROM users WHERE email =?', [email])
        if (users.length > 0) return res.status(400).json({ message: 'Email alrady used' })

        // encypt
        const hash = await bcrypt.hash(password, 10);

        //insert user
        await pool.query(
            'INSERT INTO users (name, email, password, role) VALUES (?,?,?,?)',
            [name, email, hash, role]
        )

        res.status(201).json({
            message: 'User Registered Successfully'
        })
    } catch (error) {
        res.status(500).json({ message: 'error while Register user', error })
    }


}

export const login = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log('Login input:', { email, password }); // ✅ debug สำคัญ

        const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        if (!users.length) return res.status(400).json({ message: 'email not found' });

        const user = users[0];
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ message: 'Invalid Password' });

        const token = jwt.sign(
            { id: user.id, email: user.email, username: user.username, role: user.role },
            JWT_SECRET,
            { expiresIn: '3m' }
        );

        const decoded = jwt.decode(token); // 👈 ไม่ต้อง verify แค่ decode ก็พอ
        const exp = decoded.exp; // Unix timestamp
       

        res.json({ message: 'Login Success', token, exp : exp , role :  user.role , email: user.email ,name: user.name});
    } catch (error) {
        console.error('Login error:', error); // 👈 สำคัญ
        res.status(500).json({ message: 'Server error', error: error.message }); // 👈 สำคัญ
    }
}


export const getUsers = async (req, res) => {
    const [users] = await pool.query('SELECT id, email, role , password FROM users');
    res.json(users);
};
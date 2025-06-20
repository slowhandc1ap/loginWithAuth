import exprss from 'express'
import { register, login , getUsers } from '../controllers/login.controller.js';

import { verifyToken } from '../middleware/verifyToken.js';
const router = exprss.Router()


router.get('/' , (req,res)=> res.json({message : 'hi'}))

router.post('/register', register)
router.post('/login', login)
router.get('/users', verifyToken, getUsers)
export default router;
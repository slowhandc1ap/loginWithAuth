import jwt from 'jsonwebtoken'
const JWT_SECRET = process.env.JWT_SECRET

export const verifyToken = (req,res,next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader?.split(' ')[1];

    if (!token) return res.status(401).json({
        messgae : 'No Token'
    })

    try {
        const decoded =jwt.verify(token, JWT_SECRET);
        if(decoded.role !== 'admin') {
            return res.status(403).json({
                message : 'Only Addmin Allowed Access Dinine'
            })
        }
        req.user =decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Invalind or expired token'
        })
    }
}
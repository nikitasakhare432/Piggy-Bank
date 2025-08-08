// middleware/auth.js
import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;  // ✅ make sure your token payload has { id: user._id }
        next();
    } catch (err) {
        console.error('JWT Error:', err.message);
        res.status(400).json({ error: 'Invalid token' });
    }
};

export default auth;

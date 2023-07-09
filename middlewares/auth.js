import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = (user) => {
    const payload = {
        id: user.id,

    };

    // Generate a JWT with a secret key
    const token = jwt.sign(payload, JWT_SECRET, {
        expiresIn: '1h', // Set the expiration time for the token
    });

    return token;
};

const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded;
    } catch (error) {
        throw new Error('Invalid token');
    }
};

export default {
    generateToken,
    verifyToken,
};

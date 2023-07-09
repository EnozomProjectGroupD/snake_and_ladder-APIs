import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;


export  const auth =  (async (req, res, next) => {
    let token;
    if (req.header.authorization && req.header.authorization.startsWith('Bearer')) {
        token = req.header.authorization.split(" ")[1];
    }
    if (!token) {
        res.status(404).json("no token found!");
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    console.log(decoded.id);

    const user = await User.findOne({
        where: {
            id: decoded.id,
            isBlocked: false,
        }
    })

    if (!user){
        res.status(404).json("no user found!")
    }

    if (req.user.id==decoded.id){
        next();
    };

    req.user = user;
    return next();
});


// const generateToken = (user) => {
//     const payload = {
//         id: user.id,
//
//     };
//
//     // Generate a JWT with a secret key
//     const token = jwt.sign(payload, JWT_SECRET, {
//         expiresIn: '1h', // Set the expiration time for the token
//     });
//
//     return token;
// };

// const verifyToken = (token) => {
//     try {
//         const decoded = jwt.verify(token, JWT_SECRET);
//         return decoded;
//     } catch (error) {
//         throw new Error('Invalid token');
//     }
// };

// export default {
//     generateToken,
//     verifyToken,
// };

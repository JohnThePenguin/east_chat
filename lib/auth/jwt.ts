const jwt = require("jsonwebtoken");

export const generateNewToken = (nickname: string, options?: {}) => {
    const token = jwt.sign({ nickname, ...options }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });

    return token;
};

export const verifyToken = (token: string) => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if(!decoded) throw new Error('Invalid token');

    return decoded;
}
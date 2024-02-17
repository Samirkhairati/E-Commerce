import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
    const secretKey = process.env.JWT; // Replace with your actual secret key
    const payload = { userId };
    const options = { expiresIn: '30d' };
    const token = jwt.sign(payload, secretKey, options);

    res.cookie('jwt', token, {
        httpOnly: true,
        secure: true,//process.env.NODE_ENV === 'production',
        sameSite: "none",
        domain: "e-commerce-production-ecfb.up.railway.app",
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    });

    return token;
};

export default generateToken;


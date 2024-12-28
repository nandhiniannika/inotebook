require('dotenv').config({ path: '.env.local' });
const jwt = require('jsonwebtoken');

const JWTSecret = process.env.JWT_SECRET;

const fetchuser = (req, res, next) => {
    // Get the user from the JWT token and add id to the req object
    const token = req.header("auth-token");
    if (!token) {
        return res.status(401).send({ error: "Please authenticate using a valid token" });
    }

    try {
        const data = jwt.verify(token, JWTSecret);
        req.user = data.user;
        next(); // Proceed to the next middleware or route
    } catch (error) {
        console.error('JWT verification error:', error.message);
        return res.status(401).send({ error: "Please authenticate using a valid token" });
    }
};

module.exports = fetchuser;


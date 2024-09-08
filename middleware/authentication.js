const { UnauthenticatedError } = require('../errors/');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = async (req, res, next) => {
    const authHeaders = req.headers.authorization;

    if (!authHeaders || !authHeaders.startsWith('Bearer ')) {

        throw new UnauthenticatedError('Authentication invalid');
    }

    try {
        const token = authHeaders.split(' ')[1];

        const payload = jwt.verify(token, process.env.JWT_SECRET);

        req.user = { userId: payload.userId, name: payload.name };

        next();

    } catch (err) {
        throw new UnauthenticatedError('Authentication invalid');
    }

}

module.exports = auth;
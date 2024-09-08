const { StatusCodes } = require('http-status-codes');
const User = require('../models/User');
const { BadRequestError, UnauthenticatedError } = require('../errors')

const register = async (req, res) => {
    await validateRegisterValues(req.body);


    const user = await User.create(req.body);

    const token = user.generateJWT();

    res.status(StatusCodes.CREATED).json({ token });
}


const login = async (req, res) => {
    const { email, password } = req.body
    await validateLoginValues(email, password);

    const user = await User.findOne({ email });

    if (!user) {
        throw new UnauthenticatedError('Invalid Credentails');
    }

    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('Invalid Credentails');
    }

    const token = user.generateJWT();
    res.status(StatusCodes.OK).json({ token });
}

const validateRegisterValues = async (reqBody) => {
    const { name, email, password } = reqBody;

    if (!name) throw new BadRequestError('Please provide name');

    if (!email) throw new BadRequestError('Please provide email');

    if (!password) throw new BadRequestError('Please provide password');
}

const validateLoginValues = async (email, password) => {


    if (!email) throw new BadRequestError('Please provide email');

    if (!password) throw new BadRequestError('Please provide password');
}



module.exports = { login, register };


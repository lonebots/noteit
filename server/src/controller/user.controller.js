import asyncHandler from "../middleware/async.middleware.js";
import ErrorResponse from '../utils/errorResponse.utils.js'
import { createUser, findUserbyEmail, validatePassword } from '../service/user.service.js'
import { signJWT, verifyJWT } from '../utils/jwt.utils.js';
import dotenv from 'dotenv'
dotenv.config()

// secrets
const accessTokenSecretKey = process.env.ACCESS_TOKEN_SECRET_KEY
const options = {
    'issuer': process.env.JWT_OPTIONS_ISSUER,
    'subject': process.env.JWT_OPTIONS_SUBJECT,
    'audience': process.env.JWT_OPTIONS_AUDIENCE,
    "expiresIn": process.env.JWT_OPTIONS_TOKEN_EXPIN,
    "algorithm": process.env.JWT_OPTIONS_ALG
}

// register user 
export const registerUserHandler = asyncHandler(async (req, res, next) => {
    // get the user details 
    const { username, email, password } = req.body;

    // check if no email or username or password 
    if (!username || !email || !password) {
        return next(new ErrorResponse("Enter username, email and password", 400)) // client side error : no sufficient data
    }

    // check for existing user 
    const user = await findUserbyEmail(email);
    if (user) {
        return next(new ErrorResponse("Duplicate fields are found, User already exist", 400)) // client error : duplicate email / key
    }

    // create user  
    // TODO : hash the password
    const newUser = await createUser({ username: username, email: email, password: password }) // service call 

    return res.status(200).send({ success: true, data: newUser })
})

// login user 
export const loginUserHandler = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    // not data
    if (!email || !password) {
        return next(new ErrorResponse('Enter username and password', 400)) // bad request
    }

    // find user and check if the passwords match 
    const user = await validatePassword({ email, password })
    if (!user) {
        return next(new ErrorResponse('Invalid user credentials', 401)) // not found
    }

    // generate access token and send back
    const payload = { id: user._id, name: user.username }
    const accessToken = signJWT(payload, accessTokenSecretKey, options)
    return res.status(200).json({ success: true, accessToken: accessToken })
})

// verify user
export const verifyUserHandler = asyncHandler(async (req, res, next) => {
    const token = String(req.headers.authorization).split(" ")[1]
    // no token
    if (!token) {
        return next(new ErrorResponse('Authorization failed!', 400)); // bad request
    }

    const { valid, expired, decoded } = await verifyJWT(token, accessTokenSecretKey, options);

    if (valid) {
        return res.status(200).json({ success: true, expired: expired, decoded: decoded });
    } else {
        return res.status(400).json({ success: false, expired: expired, decoded: decoded });
    }

})
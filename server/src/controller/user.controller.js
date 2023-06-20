import config from 'config';
import asyncHandler from "../middleware/async.middleware.js";
import ErrorResponse from '../utils/errorResponse.utils.js'
import { createUser, findUserbyEmail, findUserbyId } from '../service/user.service.js'
import { signJWT } from '../utils/jwt.utils.js';

// secrets
const accessTokenPrivateKey = config.get('app.secret.access-token-private-key');
const accessTokenTtl = config.get('app.secret.access-token-ttl')

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

// TODO : login user 
export const loginUserHandler = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    // not data
    if (!email || !password) {
        return next(new ErrorResponse('Enter username and password', 400)) // bad request
    }

    // find user and check if the passwords match 
    const user = await findUserbyEmail(email);

    if (!user) {
        return next(new ErrorResponse('Invalid user credentials', 401)) // not found
    }

    // compare password and send a token
    const isMatch = user.comparePasswords(password)
    if (!isMatch) {
        return next(new ErrorResponse('Incorrect password,please try again', 400)); // 400
    }

    // generate access token and send back
    const payload = { id: user._id, name: user.username }
    const accessToken = signJWT(payload, accessTokenPrivateKey, { expiresIn: accessTokenTtl })
    return res.status(200).json({ succes: true, accessToken: accessToken })
})

// TODO : verify user
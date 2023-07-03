// middleware to check for authorisation
import ErrorResponse from "../utils/errorResponse.utils.js";
import { verifyJWT } from "../utils/jwt.utils.js";
import asyncHandler from "./async.middleware.js";
import { findUserbyId } from "../service/user.service.js";
import { findNoteById } from "../service/note.service.js";
import dotenv from 'dotenv'
dotenv.config()

// secrets
const accessTokenSecretKey = process.env.ACCESS_TOKEN_SECRET_KEY;
const options = {
    'issuer': process.env.JWT_OPTIONS_ISSUER,
    'subject': process.env.JWT_OPTIONS_SUBJECT,
    'audience': process.env.JWT_OPTIONS_AUDIENCE,
    "expiresIn": process.env.JWT_OPTIONS_TOKEN_EXPIN,
    "algorithm": process.env.JWT_OPTIONS_ALG
}

export const auth = asyncHandler(async (req, res, next) => {
    // grab the token
    const token = String(req.headers.authorization).split(" ")[1]

    // no token
    if (!token) {
        return next(new ErrorResponse('Unauthorized access request!', 401)) // unauthorised to access
    }

    const { valid, decoded } = await verifyJWT(token, accessTokenSecretKey, options);

    // check token validity
    if (!valid) {
        return next(new ErrorResponse('Authorization is not valid!', 401)) // unauthorised to access
    }

    // check user existence
    const user = await findUserbyId(decoded.id);
    if (!user) {
        return next(new ErrorResponse('Authorisation is not valid!', 401)) // unauthorised to access
    }

    // set user 
    req.user = user;
    return next();

})

// check if user has access to certain notes
export const authorise = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const note = await findNoteById(id);

    if (!note || String(note.user_id) !== req.user.id) {
        return next(new ErrorResponse("Unauthorised access", 401)) // unathorised access 
    }
    return next();
})
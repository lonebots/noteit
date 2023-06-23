// middleware to check for authorisation
import config from "config";
import ErrorResponse from "../utils/errorResponse.utils.js";
import { verifyJWT } from "../utils/jwt.utils.js";
import asyncHandler from "./async.middleware.js";
import { findUserbyId } from "../service/user.service.js";
import { findNoteById } from "../service/note.service.js";

// secrets
const accessTokenSecretKey = config.get('app.secret.access-token-secret-key')
const options = config.get('app.secret.jwt-options')

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
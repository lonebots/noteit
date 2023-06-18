import asyncHandler from "../middleware/async.middleware.js";
import ErrorResponse from '../utils/errorResponse.utils.js'
import { createUser, findUserbyEmail, findUserbyId } from '../service/user.service.js'

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

// TODO : verify user
import express from 'express';
import { loginUserHandler, registerUserHandler, verifyUserHandler } from '../controller/user.controller.js';

const userRouter = express.Router();

userRouter.route('/register').post(registerUserHandler); //register route 
userRouter.route('/login').post(loginUserHandler); // login
userRouter.route('/verify').get(verifyUserHandler) // verify

export default userRouter;
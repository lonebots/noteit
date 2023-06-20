import express from 'express';
import { loginUserHandler, registerUserHandler } from '../controller/user.controller.js';


const userRouter = express.Router();

userRouter.route('/register').post(registerUserHandler); //register route 
userRouter.route('/login').post(loginUserHandler); // login

export default userRouter;
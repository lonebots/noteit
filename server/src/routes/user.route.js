import express from 'express';
import { registerUserHandler } from '../controller/user.controller.js';

const userRouter = express.Router();

userRouter.route('/register').post(registerUserHandler);

export default userRouter;
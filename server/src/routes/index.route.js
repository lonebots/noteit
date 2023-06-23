import express from 'express';
import userRouter from './user.route.js';

const router = express.Router();

// health-check-route
router.get('/health', (req, res) => {
    res.send({ status: 200, message: "server looks good" });
})

// user related routes
router.use('/user', userRouter)

export default router;


import express, { json } from 'express'
import dotenv from 'dotenv'
dotenv.config()
import config from 'config'
import logger from './utils/log.utils.js'
// import { port, host } from './config/config.js'
import connectDB from './utils/connectDB.utils.js'

const app = express()
// config
const protocol = config.get("app.server.protocol")
const port = config.get('app.server.port');
const host = config.get('app.server.host');

//db
connectDB();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }))



// console.log('privateKey .env : ', process.env.PRIVATE_KEY)

app.get('/', (req, res) => {
    res.send({ status: 200, message: "server looks good" });
})

app.listen(port, host, (error) => {
    if (error) {
        logger.error(error);
        return process.exit(1);
    }
    logger.info(`server @ ${protocol}://${host}:${port}`);
})
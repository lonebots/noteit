import express, { json } from 'express'
import cors from 'cors'
import logger from './utils/log.utils.js'
import connectDB from './utils/connectDB.utils.js'
import router from './routes/index.route.js'
import errorHandler from './middleware/errorhandle.middleware.js'
import networkLogs from './middleware/networklogger.middleware.js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env' });
const app = express()
// config
const protocol = process.env.PROTOCOL;
const port = process.env.PORT || 5000;
const host = process.env.HOST;

//db
connectDB();

// middleware
app.use(cors()); // for cross origin request handling
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// route
app.use(networkLogs);
app.use(router);

// custom middleware
app.use(errorHandler);


app.listen(port, (error) => {
    if (error) {
        // logger.error(error);
        return process.exit(1);
    }
    // logger.info(`server @ ${protocol}://${host}:${port}`);
})

export default app;
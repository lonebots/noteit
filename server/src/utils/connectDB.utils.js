import mongoose from 'mongoose'
import logger from './log.utils.js'

async function connect() {
    const dbURI = process.env.MONGO_DB_URI;
    await mongoose.connect(dbURI)
    // logger.info(`db connected @ ${dbURI}`)
}

export default connect;
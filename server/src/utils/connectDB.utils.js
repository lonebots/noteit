import mongoose from 'mongoose'
import logger from './log.utils.js'
import config from 'config'

async function connect() {
    const dbURI = config.get('db.mongo.URI')
    await mongoose.connect(dbURI)
    logger.info(`db connected @ ${dbURI}`)
}

export default connect;
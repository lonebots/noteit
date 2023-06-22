import jwt from 'jsonwebtoken'
import logger from './log.utils.js'

export const signJWT = (object, privateKey, options) => {
    return jwt.sign(object, privateKey, { ...options })
}

export const verifyJWT = (token, publicKey) => {
    try {
        const decoded = jwt.verify(token, publicKey);
        logger.info("decoded : ", decoded)
        return {
            valid: true,
            expired: false,
            decoded
        }
    } catch (error) {
        logger.error(error.message)
        return {
            valid: false,
            expired: error.message === 'jwt expired',
            decoded: false
        }
    }
}
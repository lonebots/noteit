import jwt from 'jsonwebtoken'
import logger from './log.utils.js'

export const signJWT = (object, privateKey, options) => {
    return jwt.sign(object, privateKey, { ...options })
}

export const verifyJWT = async (token, publicKey, options) => {
    try {
        const decoded = await jwt.verify(token, publicKey, { ...options })
        return {
            valid: true,
            expired: false,
            decoded: decoded,
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
import logger from '../utils/log.utils.js'
// console log every network request 

const networkLog = (req, res, next) => {
    // logger.info(`${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next();
};

export default networkLog;
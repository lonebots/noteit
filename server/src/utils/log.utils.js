import logger from 'pino'
import dayjs from 'dayjs'

const logLevel = process.env.LOG_LEVEL;

const log = logger({
    // transport: {
    //     target: "pino-pretty",
    // },
    logLevel,
    base: {
        pid: false,
    },
    timestamp: () => `,"time":"${dayjs().format()}"`,
})

export default log;
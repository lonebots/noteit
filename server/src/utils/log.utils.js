import config from 'config';
import logger from 'pino'
import dayjs from 'dayjs'

const logLevel = config.get('app.server.log')

const log = logger({
    transport: {
        target: "pino-pretty",
    },
    logLevel,
    base: {
        pid: false,
    },
    timestamp: () => `,"time":"${dayjs().format()}"`,
})

export default log;
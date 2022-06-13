import dotenv from 'dotenv'

dotenv.config()

enum LogLevels {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  HTTP = 'http',
  VERBOSE = 'verbose',
  debug = 'debug',
  SILLY = 'silly'
}

/**
 * Cors setup
 *
 * @param {*} origin
 * @param {*} callback
 */
const corsConfig = {
  origin: (origin: any, callback: any) => {
    const arrayOfOrigin = process.env.CORS_ORIGIN
      ? process.env.CORS_ORIGIN.split(',')
      : []
    // if API call from same origin then the origin return undefined
    if (origin === undefined || arrayOfOrigin.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('CORS header origin cannot be added'))
    }
  },
  exposedHeaders: ['X-Response-Time']
}

const environmentConfig = Object.freeze({
  env: process.env.NODE_ENV,
  name: process.env.APP_NAME,
  url: process.env.APP_URL,
  port: process.env.APP_PORT,
  timezone: process.env.APP_TIMEZONE,
  debug: process.env.APP_DEBUG,
  logSend: process.env.APP_LOG_SEND,
  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
  },
  jwt: {
    algorithms: 'HS256',
    secretKey: process.env.JWT_SECRET_KEY,
    expire: process.env.JWT_EXPIRE
  },
  corsConfig,
  logConfig: Object.freeze({
    logFolder: './/logs//',
    errorLogFile: 'error-%DATE%.log',
    combineLogFile: 'combine-%DATE%.log',
    logLevels: LogLevels,
    logFileSize: '20m',
    logFileLife: '14d'
  })
})

export default environmentConfig

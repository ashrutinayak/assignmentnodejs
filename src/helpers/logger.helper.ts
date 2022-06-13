import winston, { format } from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'
import environmentConfig from '../config/environment.config'

const { logConfig } = environmentConfig
const { combine, timestamp, printf } = format
const logFormat = combine(
  timestamp(),
  printf(
    (info) =>
      `{'env':'${environmentConfig.env}','date':'${info.timestamp}','name':'${info.level}','message':'${info.message}'}`
  )
)

const errorTransport: DailyRotateFile = new DailyRotateFile({
  filename: `${logConfig.logFolder} ${logConfig.errorLogFile}`,
  datePattern: 'YYYY-MM-DD-HH',
  json: true,
  zippedArchive: true,
  maxSize: logConfig.logFileSize,
  maxFiles: logConfig.logFileLife,
  level: logConfig.logLevels.ERROR
})

const infoTransport: DailyRotateFile = new DailyRotateFile({
  filename: `${logConfig.logFolder} ${logConfig.combineLogFile}`,
  datePattern: 'YYYY-MM-DD-HH',
  json: true,
  zippedArchive: true,
  maxSize: logConfig.logFileSize,
  maxFiles: logConfig.logFileLife,
  level: logConfig.logLevels.INFO
})

const logger = winston.createLogger({
  format: logFormat,
  transports: [
    errorTransport,
    infoTransport,
    new winston.transports.Console({
      level: logConfig.logLevels.debug
    })
  ]
})

export default logger

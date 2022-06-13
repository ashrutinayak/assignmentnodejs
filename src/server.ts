import * as core from 'express-serve-static-core'
import express from 'express'
import cors from 'cors'
import routes from './routes/index.route'
import environmentConfig from './config/environment.config'
// import logger from './helpers/logger.helper'
import modelConfig from './config/model.config'
import {
  apiResponseHandler,
  errorHandler
} from './middleware/apiResponse.middleware'
/**
 * create server setup
 * @returns {Express}
 */
export async function createServer(): Promise<core.Express> {
  const server: core.Express = express()
  // configure CORS
  server.use(cors(environmentConfig.corsConfig))
  // Body parsing
  server.use(express.json({ limit: '50mb' }))
  server.use(express.urlencoded({ limit: '50mb', extended: true }))
  // static folder
  server.use('/public', express.static('public'))
  // api routes
  server.use('/', apiResponseHandler, routes)
  // error handling
  server.use(errorHandler)
  return server
}

/**
 * start express server
 * @param {Express} expressServer
 * @returns {void}
 */
export async function startServer(
  expressServer: core.Express
): Promise<core.Express> {
  // verify db connection
  await modelConfig.verifyDbConnection
  expressServer.listen(environmentConfig.port)
  console.log(`
  =================================================================

   Server started on port ${environmentConfig.port} | ${environmentConfig.env}

  =================================================================
  `)
  return expressServer
}

// process.on('unhandledRejection', (error: Error) => {
//   logger.error(error)
//   process.exit(1)
// })

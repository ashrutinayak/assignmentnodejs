import { createServer, startServer } from './server'
import logger from './helpers/logger.helper'

/**
 * app initialization
 */
createServer()
  .then(startServer)
  .catch((error: Error) => {
    logger.error(error)
  })

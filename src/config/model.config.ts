import { Sequelize } from 'sequelize'
import dbModels from '../db/models'
import logger from '../helpers/logger.helper'

const dbConfig = require('./db.config')

const sequelize = new Sequelize(dbConfig)

const modelConfig: any = dbModels.modelsInitialization(sequelize, Sequelize)
modelConfig.sequelize = sequelize
modelConfig.Sequelize = Sequelize

const verifyDbConnection = async () => {
  try {
    await modelConfig.sequelize.authenticate()
    console.log('>> DB Connected Successfully')
  } catch (error) {
    logger.error(`DB connection error : ${error.message}`)
    process.exit(1)
  }
}

modelConfig.verifyDbConnection = verifyDbConnection()

export default modelConfig

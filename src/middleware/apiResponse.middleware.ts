import { Request, Response, NextFunction } from 'express'
import { isCelebrateError } from 'celebrate'
import messageConstant from '../constants/message.constant'
import httpStatusConstant from '../constants/httpStatus.constant'
import apiStatusConstant from '../constants/apiStatus.constant'
import logger from '../helpers/logger.helper'

/**
 * attach success and fail response handler to response object
 * @param {Request} _req
 * @param {Request} res
 * @param {NextFunction} next
 * @return {Response}
 */
const apiResponseHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // success response handler
  res.successResponse = (
    code: number = httpStatusConstant.OK,
    message: string = null,
    data: any = null,
    statusCode: any = apiStatusConstant.success
  ) => {
    // logger.info(
    //   JSON.stringify({
    //     path: req.originalUrl,
    //     params: req.params,
    //     body: req.body,
    //     statusType: statusCode,
    //     message,
    //     data
    //   })
    // )
    message = !message ? messageConstant.success : message
    return res.status(code).json({ statusType: statusCode, message, data })
  }

  // fail response handler
  res.failResponse = (
    code: number = httpStatusConstant.BAD_REQUEST,
    message: string = messageConstant.fail,
    error: any = null,
    statusCode: string = apiStatusConstant.fail
  ) => {
    if (code === httpStatusConstant.INTERNAL_SERVER_ERROR) {
      message = messageConstant.internalServerError
      if (error) {
        logger.error(`Internal Server Error  ==>  ${error.message}`)
      }
      logger.error(
        JSON.stringify({
          path: req.originalUrl,
          params: req.params,
          body: req.body,
          statusType: statusCode,
          message
        })
      )
    }
    return res.status(code).json({ statusType: statusCode, message })
  }
  next()
}

/**
 * joi error handler
 * @param {Error} error
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @return {Response}
 */
const errorHandler = (
  error: any,
  _req: Request,
  res: Response,
  next: NextFunction
  // eslint-disable-next-line consistent-return
): Response => {
  if (isCelebrateError(error)) {
    const { details } = error.details.get('body')
    const message = details
      .map((i: { message: string }) => i.message.replace(/['"]+/g, ''))
      .join(',')
    return res.status(httpStatusConstant.BAD_REQUEST).send({
      statusCode: httpStatusConstant.BAD_REQUEST,
      message
    })
  }
  logger.error(`Unhandled Error ==> ${JSON.stringify(error)}`)
  next()
}

export { apiResponseHandler, errorHandler }

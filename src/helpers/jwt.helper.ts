import * as Jwt from 'jsonwebtoken'

/**
 * @function decodeToken
 * @title decode jwt token
 * @description decode bearer jwt token
 * @param {string} token
 * @returns {object}
 */
export const decodeToken = (token: string): object => {
  try {
    const jwtPayload = Jwt.decode(token, { complete: true })
    if (!jwtPayload) {
      return {
        valid: false,
        msg: 'invalid decode',
        data: null
      }
    }
    return { valid: true, msg: 'decoded payload', data: jwtPayload }
  } catch (error) {
    return Promise.reject(new Error(error.message))
  }
}

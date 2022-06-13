/* eslint-disable no-bitwise */
import moment from 'moment'

/**
 * generates uid for api
 * @returns {string}
 */
const uidGenerator = () => {
  return 'xxxxxxxx-xxxx-xxxx-yxxx-xxxxxxxxxxxx'.replace(
    /[xy]/g,
    (c: string): string => {
      const r = (Math.random() * 16) | 0
      const v = c === 'x' ? r : (r & 0x3) | 0x8
      return v.toString(16)
    }
  )
}

/**
 * generates diffrence between two dates in days
 * @param {any} a
 * @param {any} b
 * @returns {number}
 */
const dateDiffInDays = (a: any, b: any) => {
  const msPerDay = 1000 * 60 * 60 * 24
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate())
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate())
  return Math.floor((utc2 - utc1) / msPerDay)
}

/**
 * create slug
 * @param string
 * @returns {string}
 */
const convertStringToSlug = (string: string) => {
  string = string
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
    .replace('--', '-')
  const realString = string.replace('-', '')
  if (realString.length < 1) {
    return ''
  }
  return string
}

/**
 * rename object key
 * @param {any} object
 * @param {string} key
 * @param {string} rename
 * @returns {object}
 */
const renameObjKey = (obj: any, key: string, rename: string) => {
  if (!obj && Object.keys(obj).length === 0 && obj.constructor === Object)
    return
  if (
    !Object.prototype.hasOwnProperty.call(obj, key) ||
    rename.length === 0 ||
    rename === key
  ) {
    // eslint-disable-next-line consistent-return
    return obj
  }
  delete Object.assign(obj, { [rename]: obj[key] })[key]
  // eslint-disable-next-line consistent-return
  return obj
}

/**
 * get UTC start day by offset
 * @param {string} offset
 * @returns {Date}
 */
const startDayByOffset = (offset: string) => {
  return moment().startOf('day').utcOffset(offset).format()
}

/**
 * get UTC start date time
 * @param {string} offset
 * @returns {Date}
 */
const getUTCstartDateTime = (dateTime: any) => {
  return moment(dateTime).startOf('day').utc().format('YYYY-MM-DD HH:mm:ss')
}

/**
 * get UTC end date time
 * @param {string} offset
 * @returns {Date}
 */
const getUTCEndDateTime = (dateTime: any) => {
  return moment(dateTime).endOf('day').utc().format('YYYY-MM-DD HH:mm:ss')
}

/**
 * convert local to utc date-time
 * @param dateTime
 * @returns {Date}
 */
const convertDateTimeLocalToUtc = (dateTime: string) => {
  const utcDateTime = new Date(`${dateTime}.000Z`)
  return utcDateTime
}

/**
 * TODO: get UTC start date by offset
 * @param {string} offset
 * @returns {Date}
 */
const startDateByOffset = (date: any) => {
  return moment(date).startOf('day').format()
}
const endDateByOffset = (date: any) => {
  return moment(date).endOf('day').format()
}

/**
 * convert cent to usd base on amount
 * @param amount
 * @returns {number}
 */
const centToUsdConverter = (amount: number) => {
  amount = amount > 0 ? amount / 100 : amount
  return amount
}

/**
 * convert usd to cent base on amount
 * @param amount
 * @returns {number}
 */
const usdToCentConverter = (amount: number) => {
  amount = amount > 0 ? amount * 100 : amount
  return amount
}

export default {
  uidGenerator,
  dateDiffInDays,
  convertStringToSlug,
  renameObjKey,
  startDayByOffset,
  convertDateTimeLocalToUtc,
  getUTCstartDateTime,
  getUTCEndDateTime,
  startDateByOffset,
  endDateByOffset,
  centToUsdConverter,
  usdToCentConverter
}

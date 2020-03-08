export const arrayHasValue = arr =>
  arr !== undefined && arr !== null && Array.isArray(arr) && arr.length > 0

export const objectHasValue = obj =>
  obj !== null && obj !== undefined && Object.keys(obj).length > 0

export const stringHasValue = str =>
  str !== null && str !== undefined && str !== ''

export const isFunction = fn => {
  return Object.prototype.toString.call(fn) === '[object Function]'
}

export const mapObject = (obj, fn) =>
  Object.keys(obj).map((key, idx) =>
    isFunction(fn) ? fn(obj[key], idx) : obj[key]
  )

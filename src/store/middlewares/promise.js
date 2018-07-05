function isPromise (val) {
  return val && typeof val.then === 'function'
}

function isPlainObject (val) {
  return Object.prototype.toString.call(val) === '[object Object]'
}

function isString (val) {
  return typeof val === 'string'
}

function isValidKey(key) {
  return ['type', 'payload', 'error', 'meta'].indexOf(key) > -1
}

function isFSA (action) {
  return (
    isPlainObject(action) &&
    isString(action.type) &&
    Object.keys(action).every(isValidKey)
  )
}

/**
 * promise中间件，处理Promise类型的action
 */
export function promise({ dispatch }) {
  return next => action => {
    if (!isFSA(action)) {
      return isPromise(action) ? action.then(dispatch) : next(action)
    }

    return isPromise(action.payload)
      ? action.payload
        .then(result => dispatch({ ...action, payload: result }))
        .catch(error => {
          dispatch({ ...action, payload: error, error: true })
          return Promise.reject(error)
        })
      : next(action)
  }
}
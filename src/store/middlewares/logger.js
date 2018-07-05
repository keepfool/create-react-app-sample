/**
 * logger中间件
 */
export function logger ({ getState }) {
  return next => action => {

    console.log('will dispatch', action)

    const returnValue = next(action)

    console.log('returnValue:' + JSON.stringify(returnValue))

    console.log('state after dispatch', getState())

    return returnValue
  }
}
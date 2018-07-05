/**
 * thunk中间件，处理function类型的action
 */
function createThunkMiddleware (extraArgument) {

  return ({ dispatch, getState }) => next => action => {
    // 如果action是一个函数，则将action函数执行完后的结果返回
    if (typeof action === 'function') {
      return action(dispatch, getState, extraArgument)
    }
    return next(action)
  }
}

export const thunk = createThunkMiddleware()
thunk.withExtraArgument = createThunkMiddleware


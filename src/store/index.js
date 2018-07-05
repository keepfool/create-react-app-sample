import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'

/** 自定义middleware */
// import { thunk, promise, logger } from './middlewares'

/** 使用第三方middleware */
import thunk from 'redux-thunk'
import promise from 'redux-promise'
import logger from 'redux-logger'
import { fetchUsers } from './actions/githubActions'

// middware洋葱模型
const store = createStore(rootReducer, applyMiddleware(thunk, promise, logger))

// dispatch一个Promise（基于promise中间件）
store.dispatch(fetchUsers({ pageNo: 1, pageSize: 5 }))

export default store
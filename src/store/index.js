import { createStore } from 'redux'
import rootReducer from './reducers'
import { subscribe } from './util'
import { handleChangeTodos } from './listeners'

const store = createStore(rootReducer)

subscribe(store, handleChangeTodos)

export default store
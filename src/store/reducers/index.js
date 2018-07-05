import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'
import github from './github'

export default combineReducers({
  todos,
  visibilityFilter,
  github
})
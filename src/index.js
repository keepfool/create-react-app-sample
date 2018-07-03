import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import rootReducer from './reducers'
import registerServiceWorker from './registerServiceWorker'
import './index.css'

const store = createStore(rootReducer)

let currentTodos
function handleChangeTodos () {
  let state = store.getState()
  let previousTodos = currentTodos
  currentTodos = state.todos
  
  if (previousTodos !== currentTodos) {
    console.log(
      'Some deep nested property changed from',
      previousTodos,
      'to',
      currentTodos
    )
  }
}

store.subscribe(handleChangeTodos)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('root')
)
registerServiceWorker()

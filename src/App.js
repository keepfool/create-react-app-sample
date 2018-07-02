import React from 'react'
import { hot } from 'react-hot-loader'

import AddTodo from '@/containers/AddTodo'
import Footer from '@/components/Footer'
import VisibleTodoList from '@/containers/VisibleTodoList'

import './App.css'

const App = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
)

export default hot(module)(App)

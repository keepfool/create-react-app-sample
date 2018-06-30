import React, { Component } from 'react'
import { hot } from 'react-hot-loader'

import logo from './logo.svg'
import './App.css'

import BasicExampleCodeSplitting from './pages/BasicExampleCodeSplitting'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <BasicExampleCodeSplitting />
      </div>
    )
  }
}

export default hot(module)(App)

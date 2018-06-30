import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Loadable from 'react-loadable'
import Loading from '../components/Loading'

const BasicExampleCodeSplitting = () => (
  <Router>
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/topics">Topics</Link>
        </li>
      </ul>

      <hr />

      <Route exact path="/" component={AsyncHome} />
      <Route path="/about" component={AsnycAbout} />
      <Route path="/topics" component={AsyncTopics} />
    </div>
  </Router>
)

const AsyncHome = Loadable({
  loader: () => import('../components/Home'),
  loading: Loading
})

const AsnycAbout = Loadable({
  loader: () => import('../components/About'),
  loading: Loading
})

const AsyncTopics = Loadable({
  loader: () => import('../components/Topics'),
  loading: Loading
})

export default BasicExampleCodeSplitting
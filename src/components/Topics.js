import React from 'react'
import { Route, Link } from 'react-router-dom'
import Loadable from 'react-loadable'
import Loading from './Loading'

const AsyncTopic = Loadable({
  loader: () => import('./Topic'),
  loading: Loading
})

const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>Rendering with React</Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>Components</Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={AsyncTopic} />
    <Route
      exact
      path={match.url}
      render={() => <h3>Please select a topic.</h3>}
    />
  </div>
)

export default Topics
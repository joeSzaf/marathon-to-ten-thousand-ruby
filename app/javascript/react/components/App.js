import React from 'react'
import { Router, browserHistory, Route, IndexRoute } from 'react-router';

import ActivityNewContainer from "../containers/ActivityNewContainer"
import HomeContainer from "../containers/HomeContainer"

export const App = props => {
  return(
    <div>
      <Router history={browserHistory}>
        <Route path='/activities' component={ActivityNewContainer} />
        <Route path='/activities/new' component={ActivityNewContainer} />
        <Route path='/activities/:id' component={ActivityNewContainer} />
        <Route path='/' component={HomeContainer} />
      </Router>
    </div>
  )
}

export default App

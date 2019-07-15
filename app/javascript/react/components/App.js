import React from 'react'
import { Router, browserHistory, Route, IndexRoute } from 'react-router';

import ActivityNewContainer from "../containers/ActivityNewContainer"

export const App = props => {
  return(
    <div>
      <Router history={browserHistory}>
        <Route path='/activities' component={ActivityNewContainer} />
        <Route path='/activities/new' component={ActivityNewContainer} />
        <Route path='/activities/:id' component={ActivityNewContainer} />
      </Router>
    </div>
  )
}

export default App

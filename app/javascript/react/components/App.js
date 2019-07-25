import React from 'react'
import { Router, browserHistory, Route, IndexRoute } from 'react-router';

import ActivityNewContainer from "../containers/ActivityNewContainer"
import ActivitiesContainer from "../containers/ActivitiesContainer"
import HomeContainer from "../containers/HomeContainer"

export const App = props => {
  return(
    <div>
      <Router history={browserHistory}>
        <Route path='/activities' component={ActivitiesContainer} />
        <Route path='/activities/new' component={ActivityNewContainer} />
        <Route path='/activities/:id' component={ActivityNewContainer} />
        <Route path='/' component={HomeContainer} />
      </Router>
    </div>
  )
}

export default App

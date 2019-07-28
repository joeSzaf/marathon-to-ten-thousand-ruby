import React from 'react'
import { Switch, Route, Redirect, Link } from 'react-router-dom'

import ActivityNewContainer from "../containers/ActivityNewContainer"
import ActivitiesContainer from "../containers/ActivitiesContainer"
import ActivityShowContainer from "../containers/ActivityShowContainer"
import HomeContainer from "../containers/HomeContainer"

const BaseLayout = props => {

  return(
    <div>
      <Switch>
        <Route exact path='/activities/new' component={ActivityNewContainer} />
        <Route path='/activities/:id' component={ActivityShowContainer} />
        <Route exact path='/activities' component={ActivitiesContainer} />
        <Route exact path='/' component={HomeContainer} />
      </Switch>
    </div>
  )
}

export default BaseLayout

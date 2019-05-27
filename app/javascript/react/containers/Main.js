import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from "../containers/Home"
import Activities from "../containers/Activities"
import Summary from "../containers/Summary"

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render(){
    return(
      <main>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/activities' component={Activities} />
          <Route path='/summary' component={Summary} />
        </Switch>
      </main>
    )
  }
}

export default Main

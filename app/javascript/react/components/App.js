import React from 'react'
import { Switch, Route, BrowserRouter, Redirect, Link } from 'react-router-dom'

import BaseLayout from "../containers/BaseLayout"

export const App = props => {
  return(
    <BrowserRouter>
      <BaseLayout />
    </BrowserRouter>
  )
}

export default App

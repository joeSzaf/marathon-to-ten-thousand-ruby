import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import Header from "../containers/Header"
import Main from "../containers/Main"

export const App = (props) => {
  return (
      <BrowserRouter>
        <div>
          <Main />
        </div>
      </BrowserRouter>
  )
}

export default App

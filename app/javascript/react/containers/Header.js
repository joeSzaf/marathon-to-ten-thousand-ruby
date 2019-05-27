import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render(){
    return(
      <header>
        <nav>
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/activities'>Activities</Link></li>
            <li><Link to='/summary'>Summary</Link></li>
          </ul>
        </nav>
      </header>
    )
  }
}

export default Header

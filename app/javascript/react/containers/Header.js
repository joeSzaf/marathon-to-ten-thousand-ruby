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
        <div className="title-bar" data-responsive-toggle="example-menu" data-hide-for="medium">
          <button className="menu-icon" type="button" data-toggle="example-menu"></button>
          <div className="title-bar-title">Menu</div>
        </div>

        <div className="top-bar" id="example-menu">
          <div className="top-bar-left">
            <ul className="menu">
              <li className="menu-text">Marathon to Mastery</li>
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/'>Activities</Link></li>
              <li><Link to='/summary'>Summary</Link></li>
            </ul>
          </div>

          <div className="top-bar-right" >
            <ul className="menu">
              <li><Link to='/users/sign_in'>Sign-in</Link></li>
              <li><Link to='/users/sign_up'>Sign-up</Link></li>
            </ul>
          </div>
        </div>


      </header>
    )
  }
}

export default Header

import React, { Component } from 'react'

class HomeContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
    fetch('http://localhost:3000/api/v1/activities')
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
              error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => response.json())
      .then(body => {
        this.setState({
          activities: body.activities
        })
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`))
  }



  render(){
    let totalHours = 0
    let totalActivities = 0

    if (this.state.activities) {
      totalHours = this.state.activities.reduce( (sum, activity) => {
        return activity.duration + sum
      }, 0)
      totalActivities = this.state.activities.length
    }

    return(
      <div className="row">
        <p>Total hours: { totalHours }</p>
        <p>Total activities: { totalActivities }</p>
        <a href="/activities/new">add activity</a>
      </div>
    )
  }
}

export default HomeContainer

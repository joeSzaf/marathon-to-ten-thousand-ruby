import React, { Component } from 'react'

import ActivityTile from "../components/ActivityTile"

class Activities extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activities: []
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
    let activities = this.state.activities.map(activity => {
      return(
        <ActivityTile
          key={activity.id}
          id={activity.id}
          name={activity.name}
          category={activity.category}
          duration={activity.duration}
          date={activity.date}
          note={activity.note}
        />
      )
    })
    return(
      <div className="activity-container">
        <h1>Activities!</h1>
        {activities}
      </div>
    )
  }
}

export default Activities

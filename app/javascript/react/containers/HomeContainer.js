import React, { Component } from 'react'
import moment from 'moment'

import FilterController from "../components/FilterController"

class HomeContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: "week",
      numberOfShows: 0,
      totalHours: 0,
      activities: [],
      filteredActivities: [],
      filteredActivitiesHours: 0,
      filteredNumberOfShows: 0
    }
    this.processActivities = this.processActivities.bind(this)
    this.handleFilterSelect = this.handleFilterSelect.bind(this)
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
        this.processActivities(1, this.state.selected, this.state.activities)
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  handleFilterSelect(event){
    this.setState({
      selected: event.target.text
    })
    this.processActivities(1, event.target.text, this.state.activities)
  }

  processActivities(timeUnits, unitOfTime, activities) {
    let totalHours = 0
    let totalActivities = 0
    let totalShows = 0
    let startDate = moment().subtract(timeUnits, unitOfTime)

    let filteredActivities = []
    let filteredNumberOfShows = 0
    let filteredActivitiesHours = 0

    activities.forEach(activity => {
      if (activity.category === 'show') {
        totalShows ++
      }
      totalHours += activity.duration

      if (moment(activity.date).isAfter(startDate)) {
        filteredActivities.push(activity)
        filteredActivitiesHours += activity.duration

        if (activity.category === 'show') {
          filteredNumberOfShows ++
        }
      }
    })

    this.setState({
      filteredActivities: filteredActivities,
      numberOfShows: totalShows,
      totalHours: totalHours,
      filteredNumberOfShows: filteredNumberOfShows,
      filteredActivitiesHours: filteredActivitiesHours
    })

  }

  render(){
    let totalActivities = this.state.activities.length

    return(
      <div>

        <p>Total hours: { this.state.totalHours }</p>
        <p>Total activities: { totalActivities }</p>
        <p>Total shows: { this.state.numberOfShows }</p>
        <div className="row">
          <p><a className="activeFilter">week</a> / <a>month</a> / <a>year</a></p>
        </div>
        <FilterController
          selectedUnit = {this.state.selected}
          options = {["week", "month", "year"]}
          handleClick = {this.handleFilterSelect}
        />
        <div>
          <p>Hours since last week: { this.state.filteredActivitiesHours }</p>
          <p>Activities since last week: { this.state.filteredActivities.length }</p>
          <p>Shows since last week: { this.state.filteredNumberOfShows }</p>
        </div>
        <a href="/activities/new">
          <div className="addButton">
            <i className="fas fa-plus fa-4x"></i>
          </div>
        </a>

      </div>
    )
  }
}

export default HomeContainer

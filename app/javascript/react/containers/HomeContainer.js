import React, { Component } from 'react'
import moment from 'moment'

import FilterController from "../components/FilterController"
import TimeBarChart from "../components/TimeBarChart"

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
      filteredNumberOfShows: 0,
      barChartData: []
    }
    this.processActivities = this.processActivities.bind(this)
    this.handleFilterSelect = this.handleFilterSelect.bind(this)
    this.processBarChartData = this.processBarChartData.bind(this)
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
    let startDate = moment().subtract(timeUnits, unitOfTime).startOf('day').add(1, "day")
    let filteredActivities = []
    let filteredNumberOfShows = 0
    let filteredActivitiesHours = 0

    let barChartData = []

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

    barChartData = this.processBarChartData(filteredActivities, startDate)

    this.setState({
      filteredActivities: filteredActivities,
      numberOfShows: totalShows,
      totalHours: totalHours,
      filteredNumberOfShows: filteredNumberOfShows,
      filteredActivitiesHours: filteredActivitiesHours,
      barChartData: barChartData
    })

  }

  processBarChartData(activities, startDate) {
    let processedData = {}

    let currentDate = startDate

    activities.forEach(activity => {
      if (!(activity.date in processedData)) {
        processedData[activity.date] = {}
      }

      if (!(activity.category in processedData[activity.date])) {
        processedData[activity.date][activity.category] = 1
      } else {
        processedData[activity.date][activity.category] += activity.duration
      }
    })

    let graphData = []

    for (let date in processedData) {
      let bar = {}
      bar['name'] = date
      for (let activityType in processedData[date]) {
        bar[activityType] = processedData[date][activityType]
      }
      graphData.push(bar)
    }

    let sortedGraphData = graphData.sort(function(a, b){return a.name.localeCompare(b.name)})
    return sortedGraphData
  }

  render(){
    let totalActivities = this.state.activities.length

    return(
      <div>

        <p>Total hours: { this.state.totalHours }</p>
        <p>Total activities: { totalActivities }</p>
        <p>Total shows: { this.state.numberOfShows }</p>
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
        <TimeBarChart
          activities={this.state.barChartData}
        />

      </div>
    )
  }
}

export default HomeContainer

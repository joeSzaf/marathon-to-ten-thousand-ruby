import React from 'react'
import { Router, browserHistory, Route, IndexRoute } from 'react-router'
import TextField from '../components/TextField'
import DateTimeField from '../components/DateTimeField'

class ActivityShowContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      category: '',
      date: '',
      duration: '',
      note: '',
      errors: {}
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.updateActivity = this.updateActivity.bind(this)
    this.fetchAndUpdate = this.fetchAndUpdate.bind(this)
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  fetchAndUpdate() {
    let activity_id = this.props.match.params.id
    fetch(`/api/v1/activities/${activity_id}.json`)
    .then(response => {
      if (response.ok) {
        return response
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage)
        throw(error)
      }
    })
    .then(response => response.json())
    .then(body => {
      this.setState({
        id: body.id,
        name: body.name,
        category: body.category,
        date: body.date,
        duration: body.duration,
        note: body.note
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  updateActivity(formPayload){
    let activity_id = this.props.match.params.id
    fetch(`/api/v1/activities/${activity_id}`,{
      credentials: 'same-origin',
      method: 'PATCH',
      body: JSON.stringify(formPayload),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status}(${response.statusText})` ,
          error = new Error(errorMessage);
          throw(error);
        }
        })
        .then(response => {
          this.fetchAndUpdate()
          let successMessage = { updateSuccess: "Act sucessfully updated" }
          this.setState({ errors: Object.assign({}, this.state.errors, successMessage) })
        })
        .catch(error => {
          let formError = { formError: error.message }
          this.setState({ errors: Object.assign({}, this.state.errors, formError) })
          console.error(`Error in fetch: ${error.message}`)
        })
  }

  handleSubmit(event) {
    event.preventDefault()
    let formPayload = {
      name: this.state.name,
      category: this.state.category,
      date: this.state.date,
      duration: this.state.duration,
      note: this.state.note
    }
    this.updateActivity(formPayload);
  }

  componentDidMount() {
    this.fetchAndUpdate()
  }

  render(){
    let errorDiv
    let errorItems

    if (Object.keys(this.state.errors).length > 0) {
      errorItems = Object.values(this.state.errors).map(error => {
        return(<li key={error}>{error}</li>)
      })
      errorDiv = <div className="callout alert">{errorItems}</div>
    }

    return(
      <form className="callout" onSubmit={this.handleSubmit}>
      {errorDiv}
        <TextField
          name="name"
          content={this.state.name}
          label="Name:"
          handleChangeMethod={this.handleChange}
        />
        <TextField
          name="category"
          content={this.state.category}
          label="Type of Activity:"
          handleChangeMethod={this.handleChange}
        />

        <DateTimeField
          name="date"
          content={this.state.date}
          label="Date:"
          handleChangeMethod={this.handleChange}
        />

        <TextField
          name="duration"
          content={this.state.duration}
          label="Duration:"
          handleChangeMethod={this.handleChange}
        />
        <TextField
          name="note"
          content={this.state.note}
          label="Notes:"
          handleChangeMethod={this.handleChange}
        />

        <div className="button-group">
          <a className="button" href="/activities">Back</a>
          <input className="button secondary" type="submit" value="Update activity" />
        </div>
      </form>
    )
  }
}

export default ActivityShowContainer

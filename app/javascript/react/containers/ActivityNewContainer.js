import React from 'react'
import { Router, browserHistory, Route, IndexRoute } from 'react-router'
import TextField from '../components/TextField'
import DateTimeField from '../components/DateTimeField'

class ActivityNewContainer extends React.Component {
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
    this.handleClearForm = this.handleClearForm.bind(this)
    this.addNewActivity = this.addNewActivity.bind(this)
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  addNewActivity(formPayload){
    fetch("/api/v1/activities",{
      credentials: 'same-origin',
      method: 'POST',
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
          window.location.assign("/")
        })
        .catch(error => {
          let formError = { formError: error.message }
          this.setState({ errors: Object.assign({}, this.state.errors, formError) })
          console.error(`Error in fetch: ${error.message}`)
        });
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
    this.addNewActivity(formPayload);
    this.handleClearForm(event)
  }

  handleClearForm(event) {
    event.preventDefault()
    this.setState({
      name: '',
      category: '',
      date: '',
      duration: '',
      note: '',
      errors: {}
    })
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
          <button className="button" onClick={this.handleClearForm}>Clear</button>
          <input className="button" type="submit" value="Submit Form" />
        </div>
      </form>
    )
  }
}

export default ActivityNewContainer

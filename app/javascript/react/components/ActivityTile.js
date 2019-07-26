import React from 'react'
import { Switch, Route, Redirect, Link } from 'react-router-dom'
import moment from 'moment'

const ActivityTile = props => {

  let notes

  if (props.note) {
    notes = <p className="acitivity-notes">Note: {props.note}</p>
  }

  return(
    <div className="row activity-tile" onClick={() => window.location.assign(`/activities/${props.id}`)}>
      <p>{props.name} - <em>{props.category}</em> ({props.duration}), {moment(props.date).format("MM-DD-YYYY") }</p>
      { notes }
    </div>
  )
}

export default ActivityTile

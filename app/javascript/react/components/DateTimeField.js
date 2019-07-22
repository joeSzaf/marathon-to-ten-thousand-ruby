import React from 'react'

const DateTimeField = props => {
  return(
    <label>{props.label}
      <input
        name={props.name}
        type='date'
        value={props.content}
        onChange={props.handleChangeMethod}
      />
    </label>
  )
}

export default DateTimeField

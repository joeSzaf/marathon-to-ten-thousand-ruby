import React from 'react'

const FilterController = props => {

  let links = props.options.map(option => {
    if (option === props.selectedUnit) {
      return(
        <span> | <a className="activeFilter" onClick={props.handleClick}>{option}</a></span>
      )
    } else {
      return(
        <span> | <a onClick={props.handleClick}>{option}</a></span>
      )
    }
  })

  console.log(links)
  return(
    <div>
      {links}
    </div>
  )
}

export default FilterController

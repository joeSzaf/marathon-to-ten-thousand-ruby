import React from 'react'

import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts'

const TimeBarChart = props => {

  return(
    <BarChart
      width={500}
      height={300}
      data={props.activities}
      margin={{
        top: 20, right: 30, left: 20, bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="practice" stackId="a" fill="#8884d8" />
      <Bar dataKey="show" stackId="a" fill="#82ca9d" />
      <Bar dataKey="tech" stackId="a" fill="#222222" />
    </BarChart>
  )
}

export default TimeBarChart

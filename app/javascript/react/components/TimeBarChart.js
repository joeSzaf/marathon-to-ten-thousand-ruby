import React from 'react'

import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts'

const TimeBarChart = props => {

  const data = [
    {
      name: 'Page A', uv: 4000, pv: 2400,
    },
    {
      name: 'Page B', uv: 3000, pv: 1398,
    },
    {
      name: 'Page C', uv: 2000, pv: 9800,
    },
    {
      name: 'Page D', uv: 2780, pv: 3908,
    },
    {
      name: 'Page E', uv: 1890, pv: 4800,
    },
    {
      name: 'Page F', uv: 2390, pv: 3800,
    },
    {
      name: 'Page G', uv: 3490, pv: 4300,
    },
  ]

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

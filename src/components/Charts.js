import React from 'react'
import { BarChart, Bar } from 'recharts'

export default function Charts({ data }) {
  const transformData = (data) => {
    return Object.values(data).map((datum, i) => {
      return { name: i, value: datum }
    })
  }

  return (
    <BarChart width={1200} height={100} data={transformData(data)}>
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  )
}

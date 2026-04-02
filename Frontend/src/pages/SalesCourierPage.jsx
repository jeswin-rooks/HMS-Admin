import React from 'react'
import StatsOverviewSection from '../components/layout/StatsOverviewSection'

const stats = [
  { title: 'Today Sales', value: 72, icon: '$', tone: 'blue' },
  { title: 'Pending Dispatch', value: 18, icon: '↗', tone: 'red' },
  { title: 'Delivered', value: 51, icon: '✔', tone: 'green' },
  { title: 'Returns', value: 3, icon: '↺', tone: 'yellow' },
]

const SalesCourierPage = () => {
  return <StatsOverviewSection stats={stats} />
}

export default SalesCourierPage

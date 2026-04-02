import React from 'react'
import StatsOverviewSection from '../components/layout/StatsOverviewSection'

const stats = [
  { title: 'Total Staff', value: 64, icon: '👥', tone: 'blue' },
  { title: 'On Leave', value: 7, icon: '-', tone: 'red' },
  { title: 'On Duty', value: 52, icon: '✔', tone: 'green' },
  { title: 'Open Shifts', value: 5, icon: '⧗', tone: 'yellow' },
]

const FollowUpPage = () => {
  return <StatsOverviewSection stats={stats} />
}

export default FollowUpPage

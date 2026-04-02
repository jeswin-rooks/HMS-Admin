import React from 'react'
import StatsOverviewSection from '../components/layout/StatsOverviewSection'

const stats = [
  { title: 'Total Beds', value: 19, icon: '🛏', tone: 'blue' },
  { title: 'Occupied', value: 10, icon: '⊘', tone: 'red' },
  { title: 'Available', value: 4, icon: '✔', tone: 'green' },
  { title: 'Cleaning Required', value: 5, icon: '⤴', tone: 'yellow' },
]

const DashboardPage = () => {
  return <StatsOverviewSection stats={stats} />
}

export default DashboardPage

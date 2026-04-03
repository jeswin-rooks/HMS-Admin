import React from 'react'
import { useData } from '../context/DataContext'
import StatsOverviewSection from '../components/layout/StatsOverviewSection'

const stats = [
  { title: 'Total Staff', value: 64, icon: '👥', tone: 'blue' },
  { title: 'On Leave', value: 7, icon: '-', tone: 'red' },
  { title: 'On Duty', value: 52, icon: '✔', tone: 'green' },
  { title: 'Open Shifts', value: 5, icon: '⧗', tone: 'yellow' },
]

const FollowUpPage = () => {
  const { beds } = useData()

  // example usage
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Follow Up & Cleaning Management</h1>
      <p>Data linked to context!</p>
      <StatsOverviewSection stats={stats} />
    </div>
  )
}

export default FollowUpPage
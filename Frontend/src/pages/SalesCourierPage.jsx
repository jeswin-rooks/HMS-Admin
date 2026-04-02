import React from 'react'
import { useData } from '../context/DataContext'
import StatsOverviewSection from '../components/layout/StatsOverviewSection'

const SalesCourierPage = () => {
  const { sales } = useData()

  const stats = [
    { title: 'Today Sales', value: 72, icon: '$', tone: 'blue' },
    { title: 'Pending Dispatch', value: 18, icon: '↗', tone: 'red' },
    { title: 'Delivered', value: 51, icon: '✔', tone: 'green' },
    { title: 'Returns', value: 3, icon: '↺', tone: 'yellow' },
  ]

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Sales & Courier Management</h1>
      <p>Data linked to context!</p>
      <StatsOverviewSection stats={stats} />
    </div>
  )
}

export default SalesCourierPage

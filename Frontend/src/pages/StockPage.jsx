import React from 'react'
import StatsOverviewSection from '../components/layout/StatsOverviewSection'

const stats = [
  { title: 'Total Medicines', value: 428, icon: '📦', tone: 'blue' },
  { title: 'Low Stock', value: 26, icon: '!', tone: 'red' },
  { title: 'Purchase Orders', value: 14, icon: '+', tone: 'green' },
  { title: 'Expiring Soon', value: 9, icon: '⏳', tone: 'yellow' },
]

const StockPage = () => {
  return <StatsOverviewSection stats={stats} />
}

export default StockPage

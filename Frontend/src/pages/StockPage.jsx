import React from 'react'
import { useData } from '../context/DataContext'
import StatsOverviewSection from '../components/layout/StatsOverviewSection'

const StockPage = () => {
  const { stock } = useData()

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Stock Management</h1>
      <p>Data linked to context!</p>
    </div>
  )
}

export default StockPage

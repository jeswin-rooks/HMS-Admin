import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import MainLayout from './components/layout/MainLayout'
import DashboardPage from './pages/DashboardPage'
import PatientsPage from './pages/PatientsPage'
import SalesCourierPage from './pages/SalesCourierPage'
import StockPage from './pages/StockPage'
import FollowUpPage from './pages/FollowUpPage'
import { DataProvider } from './context/DataContext'
import './style.css'

const App = () => {
  return (
    <DataProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900 overflow-x-hidden">
          <MainLayout>
            <Routes>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/follow-up" element={<FollowUpPage />} />
              <Route path="/patients" element={<PatientsPage />} />
              <Route path="/sales-couriers" element={<SalesCourierPage />} />
              <Route path="/stock" element={<StockPage />} />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </MainLayout>
        </div>
      </BrowserRouter>
    </DataProvider>
  )
}

export default App

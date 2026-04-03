import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import MainLayout from './components/layout/MainLayout'
import DashboardPage from './pages/DashboardPage'
import PatientsPage from './pages/PatientsPage'
import FinancePage from './pages/FinancePage'
import StockPage from './pages/StockPage'
import FollowUpPage from './pages/FollowUpPage'
import { DataProvider } from './context/DataContext'
import './style.css'

const App = () => {
  return (
    <DataProvider>
      <BrowserRouter>
        <div className="h-screen flex flex-col bg-[#F1F1F1] font-sans text-gray-900 overflow-hidden">
          <MainLayout>
            <Routes>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/follow-up" element={<FollowUpPage />} />
              <Route path="/patients" element={<PatientsPage />} />
              <Route path="/finance" element={<FinancePage />} />
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

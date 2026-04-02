import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import MainLayout from './components/layout/MainLayout'
import DashboardPage from './pages/DashboardPage'
import PatientsPage from './pages/PatientsPage'
import SalesCourierPage from './pages/SalesCourierPage'
import StockPage from './pages/StockPage'
import FollowUpPage from './pages/FollowUpPage'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/patients" element={<PatientsPage />} />
          <Route path="/sales-courier" element={<SalesCourierPage />} />
          <Route path="/stock" element={<StockPage />} />
          <Route path="/follow-up" element={<FollowUpPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

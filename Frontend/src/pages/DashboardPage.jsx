import React, { useState } from 'react'
import StatsOverviewSection from '../components/layout/StatsOverviewSection'
import BedManagementTable from '../components/facility/BedManagementTable'
import NewBedModal from '../components/facility/NewBedModal'
import { useData } from '../context/DataContext'

const DashboardPage = () => {
  const { data } = useData()
  const [activeTab, setActiveTab] = useState('bedStatus')
  const [departmentFilter, setDepartmentFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="flex-1 bg-[#F1F1F1] flex flex-col min-h-screen font-['Poppins']">
      <div className="w-full flex flex-col items-center pb-[50px]">
        
        {/* Header Area */}
        <header className="h-[224px] bg-[#ACE3CE] relative w-full flex flex-col pt-[25px] items-center">
          <div className="w-[1440px] max-w-full px-[40px] flex flex-col">
            <h2 className="text-[20px] font-semibold leading-[30px] text-[#666666]">Hello Name</h2>
            <h1 className="text-[24px] font-semibold text-[#212121] leading-[36px]">Welcome Back</h1>
          </div>
        </header>

        {/* Content Area overlapping the header */}
        <div className="mt-[-83px] w-[1360px] max-w-full flex flex-col items-start z-10 relative gap-[30px]">
          
          {/* Stats Boxes */}
          <StatsOverviewSection stats={data.stats} />

          {/* Title Tabs */}
          <div className="w-[444px] h-[56px] flex flex-row items-center gap-[30px]">
            <div 
              className={`flex flex-row justify-center items-center py-[10px] gap-[10px] h-[56px] cursor-pointer ${activeTab === 'bedStatus' ? 'border-b-[3px] border-[#051F20]' : ''}`}
              onClick={() => setActiveTab('bedStatus')}
            >
              <h2 className={`font-semibold text-[24px] leading-[36px] ${activeTab === 'bedStatus' ? 'text-[#051F20]' : 'text-[#666666]'}`}>
                Bed Status
              </h2>
            </div>
            
            <div 
              className={`flex flex-row justify-center items-center py-[10px] gap-[10px] h-[56px] cursor-pointer ${activeTab === 'cleaningManagement' ? 'border-b-[3px] border-[#051F20]' : ''}`}
              onClick={() => setActiveTab('cleaningManagement')}
            >
              <h2 className={`font-semibold text-[24px] leading-[36px] ${activeTab === 'cleaningManagement' ? 'text-[#051F20]' : 'text-[#666666]'}`}>
                Cleaning Management
              </h2>
            </div>
          </div>

          {/* Main White Container for Search & Table */}
          <div className="w-full flex flex-col">
            <BedManagementTable
              data={data.beds}
              departments={data.departments}
              statuses={data.statuses}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              departmentFilter={departmentFilter}
              setDepartmentFilter={setDepartmentFilter}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              onAddNew={() => setIsModalOpen(true)}
              activeTab={activeTab}
            />
          </div>

        </div>

        {/* Footer */}
        <footer className="mt-[50px] w-full flex justify-center text-center text-[13px] text-[#666666] py-[20px]">
          © 2024 HospitalMS Multi-Branch Enterprise Suite. All rights reserved.
        </footer>

      </div>
      
      <NewBedModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}

export default DashboardPage

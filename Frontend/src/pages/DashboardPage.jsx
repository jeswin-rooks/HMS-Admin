import React, { useState } from 'react'
import { Bed, Ban, CheckCircle, BrushCleaning } from 'lucide-react'
import BedManagementTable from '../components/facility/BedManagementTable'
import NewBedModal from '../components/facility/NewBedModal'
import { useData } from '../context/DataContext'
import PageLayout from '../components/common/PageLayout'

const iconMap = { Bed, Ban, CheckCircle, BrushCleaning, Trash2: BrushCleaning }
const colorMap = {
  blue:   { iconBg: 'bg-[#DBEAFE]', iconColor: 'text-[#1D4ED8]' },
  red:    { iconBg: 'bg-[#FAD7DA]', iconColor: 'text-[#E63946]' },
  green:  { iconBg: 'bg-[#D4EDDA]', iconColor: 'text-[#28A745]' },
  yellow: { iconBg: 'bg-[#FFF3CD]', iconColor: 'text-[#FFC107]' },
}

const DashboardPage = () => {
  const { data } = useData()
  const [activeTab, setActiveTab] = useState('bedStatus')
  const [departmentFilter, setDepartmentFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const dashboardStats = data.stats.map(s => ({
    ...s,
    icon: iconMap[s.icon] ? React.createElement(iconMap[s.icon], { size: 24 }) : null,
    ...(colorMap[s.color] ?? {}),
  }))

  return (
    <>
      <PageLayout stats={dashboardStats}>
        {/* Title Tabs */}
        <div className="w-[444px] h-[56px] flex flex-row items-center gap-[30px] px-5">
          <div
            className={`flex flex-row justify-center items-center py-[10px] gap-[10px] h-[56px] cursor-pointer ${activeTab === 'bedStatus' ? 'border-b-[3px] border-[#051F20]' : ''}`}
            onClick={() => setActiveTab('bedStatus')}
          >
            <h2 className={`font-semibold text-[20px] leading-[36px] ${activeTab === 'bedStatus' ? 'text-[#051F20]' : 'text-[#666666]'}`}>
              Bed Status
            </h2>
          </div>

          <div
            className={`flex flex-row justify-center items-center py-[10px] gap-[10px] h-[56px] cursor-pointer ${activeTab === 'cleaningManagement' ? 'border-b-[3px] border-[#051F20]' : ''}`}
            onClick={() => setActiveTab('cleaningManagement')}
          >
            <h2 className={`font-semibold text-[20px] leading-[36px] ${activeTab === 'cleaningManagement' ? 'text-[#051F20]' : 'text-[#666666]'}`}>
              Cleaning Management
            </h2>
          </div>
        </div>

        {/* Table */}
        <div className="w-full flex flex-col px-5">
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

      </PageLayout>

      <NewBedModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}

export default DashboardPage

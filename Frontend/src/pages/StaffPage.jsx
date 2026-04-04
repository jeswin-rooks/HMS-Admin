import React, { useState } from 'react'
import staffStatsData from '../data/staffStats.json'
import staffData from '../data/staff.json'

import StaffHeader from '../components/staff/StaffHeader'
import StaffStats from '../components/staff/StaffStats'
import StaffTabs from '../components/staff/StaffTabs'
import StaffRecordsTab from '../components/staff/StaffRecordsTab'
import AttendanceTab from '../components/staff/AttendanceTab'

const StaffPage = () => {
  const [activeTab, setActiveTab] = useState('records')
  
  return (
    <div className="flex-1 flex flex-col min-h-[calc(100vh-80px)] font-['Poppins']">
      
      {/* Header Area */}
      <StaffHeader />

      <div className="flex-1 flex justify-center pb-[#50px] relative">
        {/* Content Area */}
        <div className="w-[1360px] max-w-full flex items-start z-10 flex-col gap-7.5 absolute top-[-90px] px-5 xl:px-0">
          
          {/* Stats Boxes */}
          <StaffStats stats={staffStatsData} />

          <div className="flex flex-col gap-5 w-full">
            {/* Title Tabs */}
            <StaffTabs activeTab={activeTab} onTabChange={setActiveTab} />

            {activeTab === 'records' ? (
              <StaffRecordsTab 
                staffData={staffData} 
              />
            ) : (
              <AttendanceTab />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default StaffPage
import React, { useState } from 'react'
import { Users, Check, CheckCircle, Ban } from 'lucide-react'
import staffStatsData from '../data/staffStats.json'
import staffData from '../data/staff.json'

import PageLayout from '../components/common/PageLayout'
import StaffTabs from '../components/staff/StaffTabs'
import StaffRecordsTab from '../components/staff/StaffRecordsTab'
import AttendanceTab from '../components/staff/AttendanceTab'

const iconMap = { Users, Check, CheckCircle, Ban }

const staffStats = staffStatsData.map(s => ({
  ...s,
  icon: iconMap[s.iconName] ? React.createElement(iconMap[s.iconName], { size: 24 }) : null
}))

const StaffPage = () => {
  const [activeTab, setActiveTab] = useState('records')

  return (
    <PageLayout stats={staffStats}>
      <div className="flex flex-col gap-5 w-full">
        <StaffTabs activeTab={activeTab} onTabChange={setActiveTab} />
        {activeTab === 'records' ? (
          <StaffRecordsTab staffData={staffData} />
        ) : (
          <AttendanceTab />
        )}
      </div>
    </PageLayout>
  )
}

export default StaffPage
import React, { useState } from 'react'
import { Users, Check, CheckCircle, Ban } from 'lucide-react'
import staffStatsData from '../data/staffStats.json'
import staffData from '../data/staff.json'

import PageLayout from '../components/common/PageLayout'
import StaffTabs from '../components/staff/StaffTabs'
import StaffRecordsTab from '../components/staff/StaffRecordsTab'
import AttendanceTab from '../components/staff/AttendanceTab'
import StaffFormModal from '../components/staff/StaffFormModal'
import StaffDetailModal from '../components/staff/StaffDetailModal'

const iconMap = { Users, Check, CheckCircle, Ban }

const staffStats = staffStatsData.map(s => ({
  ...s,
  icon: iconMap[s.iconName] ? React.createElement(iconMap[s.iconName], { size: 24 }) : null
}))

const StaffPage = () => {
  const [activeTab, setActiveTab] = useState('records')
  const [staffList, setStaffList] = useState(staffData)
  const [showStaffModal, setShowStaffModal] = useState(false)
  const [editingStaff, setEditingStaff] = useState(null)
  const [viewingStaff, setViewingStaff] = useState(null)

  const handleOpenAdd = () => {
    setEditingStaff(null)
    setShowStaffModal(true)
  }

  const handleOpenEdit = (staff) => {
    setEditingStaff(staff)
    setShowStaffModal(true)
  }

  const handleOpenView = (staff) => {
    setViewingStaff(staff)
  }

  const handleSaveStaff = (payload) => {
    if (editingStaff) {
      setStaffList((prev) => prev.map((item) => (item.id === editingStaff.id ? { ...item, ...payload } : item)))
    } else {
      const nextId = staffList.length ? Math.max(...staffList.map((item) => item.id || 0)) + 1 : 1
      const defaultPid = `#STF-${String(nextId).padStart(3, '0')}`
      setStaffList((prev) => [...prev, { ...payload, id: nextId, pid: payload.pid || defaultPid }])
    }

    setShowStaffModal(false)
    setEditingStaff(null)
  }

  return (
    <PageLayout stats={staffStats}>
      <div className="flex flex-col gap-5 w-full">
        <StaffTabs activeTab={activeTab} onTabChange={setActiveTab} onAddStaff={handleOpenAdd} />
        {activeTab === 'records' ? (
          <StaffRecordsTab staffData={staffList} onEditStaff={handleOpenEdit} onViewStaff={handleOpenView} />
        ) : (
          <AttendanceTab staffData={staffList} />
        )}
      </div>

      {showStaffModal && (
        <StaffFormModal
          initialData={editingStaff}
          onClose={() => {
            setShowStaffModal(false)
            setEditingStaff(null)
          }}
          onSave={handleSaveStaff}
        />
      )}

      {viewingStaff && (
        <StaffDetailModal
          staff={viewingStaff}
          onClose={() => setViewingStaff(null)}
          onEdit={(staff) => {
            setViewingStaff(null)
            handleOpenEdit(staff)
          }}
        />
      )}
    </PageLayout>
  )
}

export default StaffPage
import React, { useState } from 'react'
import staffStatsData from '../data/staffStats.json'
import staffData from '../data/staff.json'

import PageLayout from '../components/common/PageLayout'
import StaffTabs from '../components/staff/StaffTabs'
import StaffRecordsTab from '../components/staff/StaffRecordsTab'
import AttendanceTab from '../components/staff/AttendanceTab'
import StaffFormModal from '../components/staff/StaffFormModal'
import StaffDetailModal from '../components/staff/StaffDetailModal'

const TotalStaffIcon = () => (
  <svg width="24" height="15" viewBox="0 0 24 15" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M15.2099 13.8426C15.2837 13.9558 15.3256 14.0867 15.3311 14.2217C15.3366 14.3567 15.3055 14.4907 15.2412 14.6095C15.1768 14.7283 15.0816 14.8275 14.9655 14.8966C14.8495 14.9658 14.7169 15.0023 14.5818 15.0023H0.749908C0.614811 15.0023 0.482226 14.9658 0.366162 14.8966C0.250097 14.8275 0.154863 14.7283 0.0905218 14.6095C0.0261802 14.4907 -0.00488012 14.3567 0.000622504 14.2217C0.00612513 14.0867 0.0479864 13.9558 0.121783 13.8426C1.17751 12.2176 2.73037 10.9774 4.54866 10.3073C3.54347 9.63809 2.78032 8.66317 2.37206 7.52671C1.96381 6.39024 1.93212 5.15256 2.28168 3.99669C2.63125 2.84082 3.3435 1.82813 4.31313 1.10837C5.28276 0.388613 6.45827 0 7.66585 0C8.87342 0 10.0489 0.388613 11.0186 1.10837C11.9882 1.82813 12.7004 2.84082 13.05 3.99669C13.3996 5.15256 13.3679 6.39024 12.9596 7.52671C12.5514 8.66317 11.7882 9.63809 10.783 10.3073C12.6013 10.9774 14.1542 12.2176 15.2099 13.8426ZM23.4515 13.8285C22.3955 12.2103 20.8461 10.9756 19.033 10.3073C20.2197 9.50793 21.0572 8.28641 21.375 6.89136C21.6928 5.4963 21.467 4.03258 20.7436 2.79812C20.0202 1.56366 18.8536 0.651256 17.4812 0.246622C16.1089 -0.158011 14.6339 -0.024459 13.3565 0.620095C13.3076 0.645315 13.2649 0.680966 13.2314 0.724522C13.1978 0.768079 13.1743 0.818476 13.1624 0.872146C13.1505 0.925815 13.1506 0.981443 13.1625 1.03509C13.1745 1.08874 13.1982 1.1391 13.2318 1.18259C14.1816 2.36742 14.7271 3.82526 14.7884 5.34258C14.8496 6.8599 14.4234 8.35695 13.5721 9.61447C13.5171 9.69665 13.4967 9.79724 13.5155 9.89434C13.5343 9.99144 13.5907 10.0772 13.6724 10.1329C14.7823 10.9075 15.7325 11.8889 16.4708 13.0232C16.7686 13.4793 16.8903 14.0281 16.813 14.5673C16.8043 14.6209 16.8074 14.6758 16.822 14.7281C16.8366 14.7805 16.8624 14.829 16.8977 14.8704C16.9329 14.9117 16.9767 14.945 17.026 14.9677C17.0753 14.9905 17.129 15.0023 17.1833 15.0023H22.8365C23.0016 15.0023 23.1622 14.9479 23.2932 14.8474C23.4242 14.7468 23.5184 14.6059 23.5612 14.4463C23.5872 14.3414 23.5909 14.2322 23.572 14.1258C23.5531 14.0193 23.5121 13.9181 23.4515 13.8285Z" fill="#1D4ED8"/>
  </svg>
)

const ActiveStaffIcon = () => (
  <svg width="22" height="17" viewBox="0 0 22 17" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M21.311 4.39946L9.27352 16.437C8.99225 16.7181 8.61087 16.876 8.21321 16.876C7.81556 16.876 7.43418 16.7181 7.1529 16.437L0.438524 9.68696C0.157719 9.40573 0 9.02454 0 8.62712C0 8.2297 0.157719 7.84851 0.438524 7.56728L2.31352 5.69228C2.59465 5.41233 2.97522 5.25515 3.37196 5.25515C3.7687 5.25515 4.14928 5.41233 4.4304 5.69228L8.25071 9.39728L17.322 0.437589C17.6031 0.157356 17.9839 0 18.3809 0C18.7778 0 19.1586 0.157356 19.4398 0.437589L21.3101 2.26946C21.4507 2.40885 21.5624 2.5747 21.6386 2.75745C21.7149 2.94021 21.7542 3.13625 21.7543 3.33427C21.7543 3.53229 21.7152 3.72836 21.6391 3.91118C21.5631 4.09401 21.4516 4.25996 21.311 4.39946Z" fill="#FFC107"/>
  </svg>
)

const PresentTodayIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M19.5 9.75C19.5 11.6784 18.9282 13.5634 17.8568 15.1668C16.7855 16.7702 15.2627 18.0199 13.4812 18.7578C11.6996 19.4958 9.73919 19.6889 7.84787 19.3127C5.95656 18.9365 4.21928 18.0079 2.85571 16.6443C1.49215 15.2807 0.563554 13.5434 0.187348 11.6521C-0.188858 9.76082 0.00422452 7.80042 0.742179 6.01884C1.48013 4.23726 2.72982 2.71451 4.33319 1.64317C5.93657 0.571828 7.82164 0 9.75 0C12.3349 0.00322505 14.813 1.03149 16.6407 2.85927C18.4685 4.68705 19.4968 7.16513 19.5 9.75Z" fill="#28A745"/>
  </svg>
)

const AbsentTodayIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M19.5 9.75C19.5 11.6784 18.9282 13.5634 17.8568 15.1668C16.7855 16.7702 15.2627 18.0199 13.4812 18.7578C11.6996 19.4958 9.73919 19.6889 7.84787 19.3127C5.95656 18.9365 4.21928 18.0079 2.85571 16.6443C1.49215 15.2807 0.563554 13.5434 0.187348 11.6521C-0.188858 9.76082 0.00422452 7.80042 0.742179 6.01884C1.48013 4.23726 2.72982 2.71451 4.33319 1.64317C5.93657 0.571828 7.82164 0 9.75 0C12.3349 0.00322505 14.813 1.03149 16.6407 2.85927C18.4685 4.68705 19.4968 7.16513 19.5 9.75Z" fill="#E63946"/>
  </svg>
)

const iconMap = {
  Users: <TotalStaffIcon />,
  Check: <ActiveStaffIcon />,
  CheckCircle: <PresentTodayIcon />,
  Ban: <AbsentTodayIcon />,
}

const staffStats = staffStatsData.map(s => ({
  ...s,
  icon: iconMap[s.iconName] ?? null
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
      <div className="flex flex-col gap-5 w-full px-5">
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
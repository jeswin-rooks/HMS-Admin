import React from 'react'

const StaffTabs = ({ activeTab, onTabChange, onAddStaff, onOpenAttendance }) => {
  return (
    <div className="flex justify-between items-end w-full">
      <div className="w-[420px] h-[56px] flex items-center gap-[30px]">
        <div 
          className={`h-[56px] py-[10px] cursor-pointer flex items-center ${activeTab === 'records' ? 'border-b-[3px] border-[#051F20]' : ''}`}
          onClick={() => onTabChange('records')}
        >
          <span className={`text-[24px] font-semibold leading-[36px] ${activeTab === 'records' ? 'text-[#051F20]' : 'text-[#666666]'}`}>
            Staff Records
          </span>
        </div>
        <div 
          className={`h-[56px] py-[10px] cursor-pointer flex items-center ${activeTab === 'attendance' ? 'border-b-[3px] border-[#051F20]' : ''}`}
          onClick={() => onTabChange('attendance')}
        >
          <span className={`text-[24px] font-semibold leading-[36px] ${activeTab === 'attendance' ? 'text-[#051F20]' : 'text-[#666666]'}`}>
            Attendance
          </span>
        </div>
      </div>
      {activeTab === 'records' && (
        <div>
          <button
            onClick={onAddStaff}
            className="h-[48px] px-[16px] bg-[#051F20] text-white rounded-[8px] text-[16px] leading-[24px] font-medium"
          >
            Add Staff
          </button>
        </div>
      )}

      {activeTab === 'attendance' && (
        <div>
          <button
            onClick={onOpenAttendance}
            className="h-[48px] px-[16px] bg-[#051F20] text-white rounded-[8px] text-[16px] leading-[24px] font-medium"
          >
            Attendance
          </button>
        </div>
      )}
    </div>
  )
}

export default StaffTabs
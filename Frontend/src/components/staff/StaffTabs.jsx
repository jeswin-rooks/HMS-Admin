import React from 'react'

const StaffTabs = ({ activeTab, onTabChange, onAddStaff }) => {
  return (
    <div className="flex justify-between items-end border-b border-[#E5E7EB] w-full">
      <div className="flex gap-8">
        <div 
          className={`py-3 cursor-pointer border-b-2 ${activeTab === 'records' ? 'border-[#212121]' : 'border-transparent'}`}
          onClick={() => onTabChange('records')}
        >
          <span className={`text-[18px] font-semibold leading-7 ${activeTab === 'records' ? 'text-[#212121]' : 'text-[#666666]'}`}>
            Staff Records
          </span>
        </div>
        <div 
          className={`py-3 cursor-pointer border-b-2 ${activeTab === 'attendance' ? 'border-[#212121]' : 'border-transparent'}`}
          onClick={() => onTabChange('attendance')}
        >
          <span className={`text-[18px] font-semibold leading-7 ${activeTab === 'attendance' ? 'text-[#212121]' : 'text-[#666666]'}`}>
            Attendance
          </span>
        </div>
      </div>
      <div className="pb-3">
        <button
          onClick={onAddStaff}
          className="h-10 px-5 bg-[#051F20] text-white rounded-lg text-[14px] font-medium"
        >
          Add Staff
        </button>
      </div>
    </div>
  )
}

export default StaffTabs
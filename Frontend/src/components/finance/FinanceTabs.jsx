import React from 'react'

const FinanceTabs = ({ activeTab, onTabChange }) => {
  return (
    <div className="w-[300px] h-[56px] flex items-center gap-[30px]">
      <div 
        className={`h-[56px] py-[10px] cursor-pointer flex items-center ${activeTab === 'expenses' ? 'border-b-[3px] border-[#051F20]' : ''}`}
        onClick={() => onTabChange('expenses')}
      >
        <span className={`text-[24px] font-semibold leading-[36px] ${activeTab === 'expenses' ? 'text-[#051F20]' : 'text-[#666666]'}`}>
          Expenses
        </span>
      </div>
      <div 
        className={`h-[56px] py-[10px] cursor-pointer flex items-center ${activeTab === 'billing' ? 'border-b-[3px] border-[#051F20]' : ''}`}
        onClick={() => onTabChange('billing')}
      >
        <span className={`text-[24px] font-semibold leading-[36px] ${activeTab === 'billing' ? 'text-[#051F20]' : 'text-[#666666]'}`}>
          Billing
        </span>
      </div>
    </div>
  )
}

export default FinanceTabs
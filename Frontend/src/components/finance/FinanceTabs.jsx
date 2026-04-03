import React from 'react'

const FinanceTabs = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex gap-[32px] border-b border-[#E5E7EB] w-full">
      <div 
        className={`py-[12px] cursor-pointer border-b-2 ${activeTab === 'expenses' ? 'border-[#212121]' : 'border-transparent'}`}
        onClick={() => onTabChange('expenses')}
      >
        <span className={`text-[18px] font-semibold leading-[28px] ${activeTab === 'expenses' ? 'text-[#212121]' : 'text-[#666666]'}`}>
          Expenses
        </span>
      </div>
      <div 
        className={`py-[12px] cursor-pointer border-b-2 ${activeTab === 'billing' ? 'border-[#212121]' : 'border-transparent'}`}
        onClick={() => onTabChange('billing')}
      >
        <span className={`text-[18px] font-semibold leading-[28px] ${activeTab === 'billing' ? 'text-[#212121]' : 'text-[#666666]'}`}>
          Billing
        </span>
      </div>
    </div>
  )
}

export default FinanceTabs
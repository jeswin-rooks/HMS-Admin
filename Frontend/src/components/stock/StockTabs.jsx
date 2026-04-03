import React from 'react'

const StockTabs = ({ activeTab, onTabChange }) => {
  return (
    <div className="w-full flex-row items-center gap-[30px] flex border-b border-[rgba(130,143,143,0.25)]">
      <div 
        className={`py-[12px] cursor-pointer border-b-2 ${activeTab === 'inventory' ? 'border-[#212121]' : 'border-transparent'}`}
        onClick={() => onTabChange('inventory')}
      >
        <h2 className={`font-semibold text-[20px] leading-[30px] ${activeTab === 'inventory' ? 'text-[#212121]' : 'text-[#666666]'}`}>
          Inventory
        </h2>
      </div>
      <div 
        className={`py-[12px] cursor-pointer border-b-2 ${activeTab === 'purchases' ? 'border-[#212121]' : 'border-transparent'}`}
        onClick={() => onTabChange('purchases')}
      >
        <h2 className={`font-semibold text-[20px] leading-[30px] ${activeTab === 'purchases' ? 'text-[#212121]' : 'text-[#666666]'}`}>
          Purchases
        </h2>
      </div>
    </div>
  )
}

export default StockTabs

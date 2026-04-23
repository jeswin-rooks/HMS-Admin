import React from 'react'

const StockTabs = ({ activeTab, onTabChange }) => {
  return (
    <div className="w-[340px] h-[56px] flex flex-row items-center gap-[30px]">
      <div 
        className={`h-[56px] py-[10px] flex items-center cursor-pointer ${activeTab === 'inventory' ? 'border-b-[3px] border-[#051F20]' : ''}`}
        onClick={() => onTabChange('inventory')}
      >
        <h2 className={`font-semibold text-[24px] leading-[36px] ${activeTab === 'inventory' ? 'text-[#051F20]' : 'text-[#666666]'}`}>
          Inventory
        </h2>
      </div>
      <div 
        className={`h-[56px] py-[10px] flex items-center cursor-pointer ${activeTab === 'purchases' ? 'border-b-[3px] border-[#051F20]' : ''}`}
        onClick={() => onTabChange('purchases')}
      >
        <h2 className={`font-semibold text-[24px] leading-[36px] ${activeTab === 'purchases' ? 'text-[#051F20]' : 'text-[#666666]'}`}>
          Purchases
        </h2>
      </div>
    </div>
  )
}

export default StockTabs

import React, { useState } from 'react'
import { Check, AlertTriangle, X, Package } from 'lucide-react'
import inventoryData from '../data/inventory.json'
import inventoryStatsData from '../data/inventoryStats.json'
import purchasesData from '../data/purchases.json'

import StockHeader from '../components/stock/StockHeader'
import StockStats from '../components/stock/StockStats'
import StockTabs from '../components/stock/StockTabs'
import InventoryTab from '../components/stock/InventoryTab'
import PurchasesTab from '../components/stock/PurchasesTab'

const getIcon = (iconName) => {
  switch (iconName) {
    case 'Package': return <Package size={24} />
    case 'Check': return <Check size={24} />
    case 'AlertTriangle': return <AlertTriangle size={24} />
    case 'X': return <X size={24} />
    default: return <Package size={24} />
  }
}

const stats = inventoryStatsData.map(stat => ({
  ...stat,
  icon: getIcon(stat.iconName)
}))

const StockPage = () => {
    const [activeTab, setActiveTab] = useState('inventory')
    const [activeSubTab, setActiveSubTab] = useState('available')
    
    return (
      <div className="flex-1 flex flex-col min-h-[calc(100vh-80px)] font-['Poppins']">
        
        {/* Header Area */}
        <StockHeader />

        <div className="flex-1 flex justify-center pb-[50px] relative">
          {/* Content Area */}
          <div className="w-[1360px] max-w-full flex items-start z-10 flex-col gap-[30px] absolute top-[-90px] px-5 xl:px-0">
            
            {/* Stats Boxes */}
            <StockStats stats={stats} />

            <div className="flex flex-col gap-[20px] w-full">
              {/* Title Tabs */}
              <StockTabs activeTab={activeTab} onTabChange={setActiveTab} />

              {activeTab === 'inventory' ? (
                <InventoryTab 
                  activeSubTab={activeSubTab} 
                  onSubTabChange={setActiveSubTab} 
                  inventoryData={inventoryData} 
                />
              ) : (
                <PurchasesTab 
                  purchasesData={purchasesData} 
                />
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  export default StockPage

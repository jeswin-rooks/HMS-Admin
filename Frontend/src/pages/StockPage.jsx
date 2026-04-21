import React, { useState } from 'react'
import { Check, AlertTriangle, X, Package } from 'lucide-react'
import inventoryData from '../data/inventory.json'
import inventoryStatsData from '../data/inventoryStats.json'
import purchasesData from '../data/purchases.json'

import PageLayout from '../components/common/PageLayout'
import StockTabs from '../components/stock/StockTabs'
import InventoryTab from '../components/stock/InventoryTab'
import PurchasesTab from '../components/stock/PurchasesTab'

const iconMap = { Package, Check, AlertTriangle, X }

const stockStats = inventoryStatsData.map(s => ({
  ...s,
  icon: iconMap[s.iconName] ? React.createElement(iconMap[s.iconName], { size: 24 }) : null
}))

const StockPage = () => {
  const [activeTab, setActiveTab] = useState('inventory')
  const [activeSubTab, setActiveSubTab] = useState('available')

  return (
    <PageLayout stats={stockStats}>
      <div className="flex flex-col gap-5 w-full px-5">
        <StockTabs activeTab={activeTab} onTabChange={setActiveTab} />
        {activeTab === 'inventory' ? (
          <InventoryTab
            activeSubTab={activeSubTab}
            onSubTabChange={setActiveSubTab}
            inventoryData={inventoryData}
          />
        ) : (
          <PurchasesTab purchasesData={purchasesData} />
        )}
      </div>
    </PageLayout>
  )
}

export default StockPage

import React, { useState } from 'react'
import financeStatsData from '../data/financeStats.json'
import expensesData from '../data/expenses.json'

import FinanceHeader from '../components/finance/FinanceHeader'
import FinanceStats from '../components/finance/FinanceStats'
import FinanceTabs from '../components/finance/FinanceTabs'
import ExpensesTab from '../components/finance/ExpensesTab'
import BillingTab from '../components/finance/BillingTab'

const stats = financeStatsData;

const FinancePage = () => {
  const [activeTab, setActiveTab] = useState('expenses')
  const [activeSubTab, setActiveSubTab] = useState('utilities')
  
  return (
    <div className="flex-1 flex flex-col min-h-[calc(100vh-80px)] font-['Poppins']">
      
      {/* Header Area */}
      <FinanceHeader />

      <div className="flex-1 flex justify-center pb-[50px] relative">
        {/* Content Area */}
        <div className="w-[1360px] max-w-full flex items-start z-10 flex-col gap-[30px] absolute top-[-90px] px-5 xl:px-0">
          
          {/* Stats Boxes */}
          <FinanceStats stats={stats} />

          <div className="flex flex-col gap-[20px] w-full">
            {/* Title Tabs */}
            <FinanceTabs activeTab={activeTab} onTabChange={setActiveTab} />

            {activeTab === 'expenses' ? (
              <ExpensesTab 
                activeSubTab={activeSubTab} 
                onSubTabChange={setActiveSubTab} 
                expensesData={expensesData} 
              />
            ) : (
              <BillingTab />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FinancePage
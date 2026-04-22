import React, { useState } from 'react'
import financeStatsData from '../data/financeStats.json'
import expensesData from '../data/expenses.json'

import PageLayout from '../components/common/PageLayout'
import FinanceTabs from '../components/finance/FinanceTabs'
import ExpensesTab from '../components/finance/ExpensesTab'
import BillingTab from '../components/finance/BillingTab'

const FinancePage = () => {
  const [activeTab, setActiveTab] = useState('expenses')
  const [activeSubTab, setActiveSubTab] = useState('utilities')
  const [billingViewMode, setBillingViewMode] = useState('list')

  const isPackageFormMode =
    activeTab === 'billing' && (billingViewMode === 'create' || billingViewMode === 'edit' || billingViewMode === 'view')

  return (
    <PageLayout
      stats={financeStatsData}
      statsColumns={5}
      hidePageHeader={isPackageFormMode}
      hideStats={isPackageFormMode}
    >
      <div className="flex flex-col gap-[20px] w-full px-5">
        {!isPackageFormMode && <FinanceTabs activeTab={activeTab} onTabChange={setActiveTab} />}
        {activeTab === 'expenses' ? (
          <ExpensesTab
            activeSubTab={activeSubTab}
            onSubTabChange={setActiveSubTab}
            expensesData={expensesData}
          />
        ) : (
          <BillingTab onViewModeChange={setBillingViewMode} />
        )}
      </div>
    </PageLayout>
  )
}

export default FinancePage
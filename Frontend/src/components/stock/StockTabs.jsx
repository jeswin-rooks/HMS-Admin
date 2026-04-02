import React from 'react'

const StockTabs = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="stock-top-tabs" role="tablist" aria-label="Stock module tabs">
      {tabs.map((tab) => (
        <button
          key={tab}
          type="button"
          className={activeTab === tab ? 'stock-tab stock-tab-active' : 'stock-tab'}
          onClick={() => onTabChange(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}

export default StockTabs

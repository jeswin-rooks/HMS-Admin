import React from 'react'

const StockStatusTabs = ({ activeStatus, statusCounts, onStatusChange }) => {
  const statusTabs = [
    { key: 'Available', label: `Available (${statusCounts.available})` },
    { key: 'Low Stock', label: `Low Stock (${statusCounts.lowStock})` },
    { key: 'Out Of Stock', label: `Out Of Stock (${statusCounts.outOfStock})` },
  ]

  return (
    <div className="stock-status-tabs" role="tablist" aria-label="Inventory status tabs">
      {statusTabs.map((tab) => (
        <button
          key={tab.key}
          type="button"
          className={
            activeStatus === tab.key
              ? 'stock-status-tab stock-status-tab-active'
              : 'stock-status-tab'
          }
          onClick={() => onStatusChange(tab.key)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}

export default StockStatusTabs

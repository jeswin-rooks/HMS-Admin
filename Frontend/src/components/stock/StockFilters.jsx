import React from 'react'

const StockFilters = ({
  isInventory,
  searchTerm,
  category,
  categoryOptions,
  onSearchChange,
  onCategoryChange,
  purchaseDate,
  purchaseDateOptions,
  onPurchaseDateChange,
  purchaseCategory,
  purchaseCategoryOptions,
  onPurchaseCategoryChange,
  paymentMethod,
  paymentMethodOptions,
  onPaymentMethodChange,
}) => {
  return (
    <div className="stock-filters">
      <input
        type="search"
        className="stock-search"
        placeholder="Enter doctor name etc..."
        value={searchTerm}
        onChange={(event) => onSearchChange(event.target.value)}
      />

      {isInventory ? (
        <select
          className="stock-select"
          value={category}
          onChange={(event) => onCategoryChange(event.target.value)}
        >
          {categoryOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <div className="stock-filter-group">
          <select
            className="stock-select"
            value={purchaseDate}
            onChange={(event) => onPurchaseDateChange(event.target.value)}
          >
            {purchaseDateOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <select
            className="stock-select"
            value={purchaseCategory}
            onChange={(event) => onPurchaseCategoryChange(event.target.value)}
          >
            {purchaseCategoryOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <select
            className="stock-select"
            value={paymentMethod}
            onChange={(event) => onPaymentMethodChange(event.target.value)}
          >
            {paymentMethodOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  )
}

export default StockFilters

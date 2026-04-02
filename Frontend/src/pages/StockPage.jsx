import React, { useEffect, useMemo, useState } from 'react'
import StatsOverviewSection from '../components/layout/StatsOverviewSection'
import StockFilters from '../components/stock/StockFilters'
import StockPagination from '../components/stock/StockPagination'
import StockStatusTabs from '../components/stock/StockStatusTabs'
import StockTable from '../components/stock/StockTable'
import StockTabs from '../components/stock/StockTabs'
import '../components/stock/stock.css'

const tabs = ['Inventory', 'Purchases']
const pageSize = 8
const purchaseDateOptions = ['All Dates', 'This Month', 'Today', 'Yesterday']
const paymentMethodOptions = ['All Methods', 'Card', 'UPI', 'Cash']
const normalize = (value) => String(value || '').trim().toLowerCase()

const StockPage = () => {
  const [activeTab, setActiveTab] = useState('Inventory')
  const [searchTerm, setSearchTerm] = useState('')
  const [category, setCategory] = useState('All')
  const [purchaseDate, setPurchaseDate] = useState('All Dates')
  const [purchaseCategory, setPurchaseCategory] = useState('All Categories')
  const [paymentMethod, setPaymentMethod] = useState('All Methods')
  const [data, setData] = useState({
    fallbackStats: [],
    columns: { inventory: [], purchases: [] },
    summary: [],
    inventory: [],
    purchases: [],
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [activeStatus, setActiveStatus] = useState('Available')

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await fetch('/data/stock-data.json')
        if (!response.ok) {
          throw new Error('Failed to load stock data')
        }
        const payload = await response.json()
        setData(payload)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const isInventory = activeTab === 'Inventory'
  const rows = isInventory ? data.inventory : data.purchases
  const columns = isInventory ? data.columns.inventory : data.columns.purchases

  const computedStats = useMemo(() => {
    if (!data.inventory.length) {
      return data.summary.length ? data.summary : data.fallbackStats
    }

    const statusCount = data.inventory.reduce(
      (acc, item) => {
        const status = (item.status || '').toLowerCase()
        if (status === 'available') {
          acc.available += 1
        } else if (status === 'low stock') {
          acc.lowStock += 1
        } else if (status === 'out of stock') {
          acc.outOfStock += 1
        }
        return acc
      },
      { available: 0, lowStock: 0, outOfStock: 0 },
    )

    return [
      { title: 'Total', value: data.inventory.length, icon: '📦', tone: 'blue' },
      { title: 'Available', value: statusCount.available, icon: '✔', tone: 'green' },
      { title: 'Low Stock', value: statusCount.lowStock, icon: '!', tone: 'yellow' },
      { title: 'Out Of Stock', value: statusCount.outOfStock, icon: '✕', tone: 'red' },
    ]
  }, [data.inventory, data.summary, data.fallbackStats])

  const statusCounts = useMemo(() => {
    return data.inventory.reduce(
      (acc, item) => {
        const status = (item.status || '').toLowerCase()
        if (status === 'available') {
          acc.available += 1
        } else if (status === 'low stock') {
          acc.lowStock += 1
        } else if (status === 'out of stock') {
          acc.outOfStock += 1
        }
        return acc
      },
      { available: 0, lowStock: 0, outOfStock: 0 },
    )
  }, [data.inventory])

  const categoryOptions = useMemo(() => {
    if (!rows.length) {
      return ['All']
    }

    const key = isInventory ? 'category' : 'status'
    return ['All', ...new Set(rows.map((row) => row[key]))]
  }, [rows, isInventory])

  const purchaseCategoryOptions = useMemo(() => {
    if (!data.purchases.length) {
      return ['All Categories']
    }
    return ['All Categories', ...new Set(data.purchases.map((row) => row.category))]
  }, [data.purchases])

  useEffect(() => {
    setCategory('All')
    setSearchTerm('')
    setCurrentPage(1)
    setActiveStatus('Available')
    setPurchaseDate('All Dates')
    setPurchaseCategory('All Categories')
    setPaymentMethod('All Methods')
  }, [activeTab])

  const filteredRows = useMemo(() => {
    const lowerSearch = searchTerm.trim().toLowerCase()

    return rows.filter((row) => {
      const searchable = Object.values(row).join(' ').toLowerCase()

      if (isInventory) {
        const categoryMatch = category === 'All' || row.category === category
        const statusMatch = row.status === activeStatus
        return searchable.includes(lowerSearch) && categoryMatch && statusMatch
      }

      const dateValue = normalize(row.date)
      const categoryValue = normalize(row.category)
      const paymentMethodValue = normalize(row.paymentMethod)

      const parsedRowDate = new Date(row.date)
      const today = new Date()
      const yesterday = new Date(today)
      yesterday.setDate(today.getDate() - 1)

      const isSameDate = (left, right) =>
        left.getFullYear() === right.getFullYear() &&
        left.getMonth() === right.getMonth() &&
        left.getDate() === right.getDate()

      const purchaseDateMatch =
        purchaseDate === 'All Dates'
          ? true
          : purchaseDate === 'This Month'
          ? parsedRowDate.getMonth() === today.getMonth() &&
            parsedRowDate.getFullYear() === today.getFullYear()
          : purchaseDate === 'Today'
            ? isSameDate(parsedRowDate, today)
            : isSameDate(parsedRowDate, yesterday)
      const purchaseCategoryMatch =
        purchaseCategory === 'All Categories' ||
        categoryValue === normalize(purchaseCategory)
      const paymentMethodMatch =
        paymentMethod === 'All Methods' ||
        paymentMethodValue === normalize(paymentMethod)

      return searchable.includes(lowerSearch) && purchaseDateMatch && purchaseCategoryMatch && paymentMethodMatch
    })
  }, [
    rows,
    searchTerm,
    category,
    isInventory,
    activeStatus,
    purchaseDate,
    purchaseCategory,
    paymentMethod,
  ])

  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, category, purchaseDate, purchaseCategory, paymentMethod])

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / pageSize))
  const startIndex = (currentPage - 1) * pageSize
  const paginatedRows = filteredRows.slice(startIndex, startIndex + pageSize)

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [currentPage, totalPages])

  return (
    <>
      <StatsOverviewSection stats={computedStats} />

      <section className="stock-module">
        <StockTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

        <StockFilters
          isInventory={isInventory}
          searchTerm={searchTerm}
          category={category}
          categoryOptions={categoryOptions}
          onSearchChange={setSearchTerm}
          onCategoryChange={setCategory}
          purchaseDate={purchaseDate}
          purchaseDateOptions={purchaseDateOptions}
          onPurchaseDateChange={setPurchaseDate}
          purchaseCategory={purchaseCategory}
          purchaseCategoryOptions={purchaseCategoryOptions}
          onPurchaseCategoryChange={setPurchaseCategory}
          paymentMethod={paymentMethod}
          paymentMethodOptions={paymentMethodOptions}
          onPaymentMethodChange={setPaymentMethod}
        />

        {isInventory ? (
          <StockStatusTabs
            activeStatus={activeStatus}
            statusCounts={statusCounts}
            onStatusChange={setActiveStatus}
          />
        ) : null}

        <StockTable
          columns={columns}
          rows={paginatedRows}
          loading={loading}
          error={error}
        />

        {!loading && !error ? (
          <StockPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        ) : null}
      </section>
    </>
  )
}

export default StockPage

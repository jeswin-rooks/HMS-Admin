import React, { useState, useMemo } from 'react'
import { Search, Pencil } from 'lucide-react'
import AddExpenseModal from './AddExpenseModal'
import EditExpenseModal from './EditExpenseModal'
import Pagination from '../common/Pagination'

const ROWS_PER_PAGE = 7

const SUB_TABS = [
  { key: 'utilities',     label: 'Utilities' },
  { key: 'maintenance',   label: 'Maintenance' },
  { key: 'salary',        label: 'Salary' },
  { key: 'security',      label: 'Security' },
  { key: 'miscellaneous', label: 'Miscellaneous' },
]

const DATE_FILTER_OPTIONS = [
  { value: 'All', label: 'All Dates' },
  { value: 'today', label: 'Today' },
  { value: 'last_week', label: 'Last Week' },
  { value: 'last_month', label: 'Last Month' },
  { value: 'last_year', label: 'Last Year' },
]

const parseExpenseDate = (value) => {
  if (!value) return null

  const [day, mon, year] = String(value).trim().split(' ')
  const monthMap = {
    Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
    Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
  }

  const month = monthMap[mon]
  if (month === undefined) return null

  const parsed = new Date(Number(year), month, Number(day))
  return Number.isNaN(parsed.getTime()) ? null : parsed
}

const startOfDay = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate())

const matchesDateFilter = (dateValue, selectedDateFilter) => {
  if (selectedDateFilter === 'All') return true

  const recordDate = parseExpenseDate(dateValue)
  if (!recordDate) return false

  const today = startOfDay(new Date())
  const recordDay = startOfDay(recordDate)
  const msPerDay = 24 * 60 * 60 * 1000
  const dayDiff = Math.floor((today - recordDay) / msPerDay)

  if (selectedDateFilter === 'today') {
    return dayDiff === 0
  }
  if (selectedDateFilter === 'last_week') {
    return dayDiff >= 1 && dayDiff <= 7
  }
  if (selectedDateFilter === 'last_month') {
    return dayDiff >= 1 && dayDiff <= 30
  }
  if (selectedDateFilter === 'last_year') {
    return dayDiff >= 1 && dayDiff <= 365
  }

  return true
}

const ExpensesTab = ({ activeSubTab, onSubTabChange, expensesData }) => {
  const [rows, setRows]                       = useState(expensesData)
  const [searchQuery, setSearchQuery]         = useState('')
  const [selectedDate, setSelectedDate]       = useState('All')
  const [selectedSubCat, setSelectedSubCat]   = useState('All')
  const [selectedMethod, setSelectedMethod]   = useState('All')
  const [currentPage, setCurrentPage]         = useState(1)
  const [showAddModal, setShowAddModal]       = useState(false)
  const [editingExpense, setEditingExpense]   = useState(null)

  /* ── Reset page whenever the active tab changes ── */
  const handleSubTabChange = (key) => {
    onSubTabChange(key)
    setCurrentPage(1)
    setSearchQuery('')
    setSelectedSubCat('All')
    setSelectedMethod('All')
    setSelectedDate('All')
  }
 
  /* ── Derive data for the active sub-tab ── */
  const tabData = useMemo(
    () => rows.filter(r => r.category === activeSubTab),
    [rows, activeSubTab]
  )

  const isSalary = activeSubTab === 'salary'

  /* ── Unique filter options from the active tab data ── */
  const subCatOptions = useMemo(
    () => isSalary
      ? ['All', ...new Set(tabData.map(r => r['Role']))]
      : ['All', ...new Set(tabData.map(r => r.subCategory))],
    [tabData, isSalary]
  )
  const methodOptions = useMemo(
    () => ['All', ...new Set(tabData.map(r => r.paymentMethod))],
    [tabData]
  )
  /* ── Apply filters ── */
  const filtered = useMemo(() => {
    return tabData.filter(r => {
      const q = searchQuery.toLowerCase()
      const matchSearch = isSalary
        ? !q ||
          (r['Staff Name'] || '').toLowerCase().includes(q) ||
          (r['Invoice Id'] || '').toLowerCase().includes(q) ||
          (r['Role'] || '').toLowerCase().includes(q)
        : !q ||
          (r.subCategory || '').toLowerCase().includes(q) ||
          (r.invoiceId || '').toLowerCase().includes(q) ||
          (r.paidBy || '').toLowerCase().includes(q)
      const matchDate   = matchesDateFilter(r.date, selectedDate)
      const matchSubCat = isSalary
        ? selectedSubCat === 'All' || r['Role'] === selectedSubCat
        : selectedSubCat === 'All' || r.subCategory === selectedSubCat
      const matchMethod = selectedMethod === 'All' || r.paymentMethod === selectedMethod
      return matchSearch && matchDate && matchSubCat && matchMethod
    })
  }, [tabData, searchQuery, selectedDate, selectedSubCat, selectedMethod, isSalary])

  /* ── Pagination ── */
  const totalPages   = Math.max(1, Math.ceil(filtered.length / ROWS_PER_PAGE))
  const safePage     = Math.min(currentPage, totalPages)
  const pagedRows    = filtered.slice((safePage - 1) * ROWS_PER_PAGE, safePage * ROWS_PER_PAGE)

  const goTo = (p) => setCurrentPage(Math.max(1, Math.min(p, totalPages)))

  /* ── Page numbers to render (show up to 5 pages around current) ── */
  const pageNumbers = useMemo(() => {
    const pages = []
    const start = Math.max(1, safePage - 2)
    const end   = Math.min(totalPages, start + 4)
    for (let i = start; i <= end; i++) pages.push(i)
    return pages
  }, [safePage, totalPages])

  /* ── Counts per tab ── */
  const counts = useMemo(() => {
    const c = {}
    SUB_TABS.forEach(t => {
      c[t.key] = rows.filter(r => r.category === t.key).length
    })
    return c
  }, [rows])

  const handleSaveExpense = (newExpense) => {
    const nextId = rows.length ? Math.max(...rows.map((r) => r.id || 0)) + 1 : 1
    setRows((prev) => [...prev, { ...newExpense, id: nextId }])
    onSubTabChange(newExpense.category)
    setSearchQuery('')
    setSelectedSubCat('All')
    setSelectedMethod('All')
    setSelectedDate('All')
    setShowAddModal(false)
    setCurrentPage(1)
  }

  const handleOpenEdit = (expense) => {
    setEditingExpense(expense)
  }

  const handleSaveEditedExpense = (updatedExpense) => {
    setRows((prev) => prev.map((item) => (item.id === updatedExpense.id ? updatedExpense : item)))
    setEditingExpense(null)

    if (updatedExpense.category !== activeSubTab) {
      onSubTabChange(updatedExpense.category)
      setSearchQuery('')
      setSelectedSubCat('All')
      setSelectedMethod('All')
      setSelectedDate('All')
      setCurrentPage(1)
    }
  }

  return (
    <div className="flex flex-col gap-[20px]">

      {/* ── Toolbar ── */}
      <div className="bg-white rounded-[12px] p-[20px] flex justify-between items-center shadow-[0px_4px_10px_rgba(0,0,0,0.03)] border border-[#E9E9E9]">

        {/* Search */}
        <div className="flex items-center gap-[10px] w-[340px] h-[48px] bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg px-[16px]">
          <Search size={20} className="text-[#9CA3AF]" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1) }}
            placeholder="Enter Doctor Name etc.."
            className="bg-transparent border-none outline-none text-[14px] text-[#4B5563] w-full"
          />
        </div>

        <div className="flex items-center gap-[16px]">

          {/* Date filter */}
          <div className="flex flex-col gap-[4px]">
            <span className="text-[12px] font-medium text-[#666666]">Date</span>
            <select
              value={selectedDate}
              onChange={e => { setSelectedDate(e.target.value); setCurrentPage(1) }}
              className="flex items-center justify-between w-[140px] h-[44px] px-[12px] bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-[14px] text-[#212121] cursor-pointer outline-none appearance-none pr-[32px]"
              style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23666666' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E\")", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center' }}
            >
              {DATE_FILTER_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>

          {/* Sub Category / Role filter */}
          <div className="flex flex-col gap-[4px]">
            <span className="text-[12px] font-medium text-[#666666]">{isSalary ? 'Role' : 'Sub Category'}</span>
            <select
              value={selectedSubCat}
              onChange={e => { setSelectedSubCat(e.target.value); setCurrentPage(1) }}
              className="flex items-center justify-between w-[160px] h-[44px] px-[12px] bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-[14px] text-[#212121] cursor-pointer outline-none appearance-none pr-[32px]"
              style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23666666' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E\")", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center' }}
            >
              {subCatOptions.map(s => <option key={s} value={s}>{s === 'All' ? (isSalary ? 'All Roles' : 'All Sub Categories') : s}</option>)}
            </select>
          </div>

          {/* Payment Method filter */}
          <div className="flex flex-col gap-[4px]">
            <span className="text-[12px] font-medium text-[#666666]">Payment Method</span>
            <select
              value={selectedMethod}
              onChange={e => { setSelectedMethod(e.target.value); setCurrentPage(1) }}
              className="flex items-center justify-between w-[140px] h-[44px] px-[12px] bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-[14px] text-[#212121] cursor-pointer outline-none appearance-none pr-[32px]"
              style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23666666' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E\")", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center' }}
            >
              {methodOptions.map(m => <option key={m} value={m}>{m === 'All' ? 'All Methods' : m}</option>)}
            </select>
          </div>

          {/* Add button */}
          <div className="flex flex-col gap-[4px] justify-end h-[68px]">
            <button
              onClick={() => setShowAddModal(true)}
              className="h-[44px] px-[20px] bg-[#051F20] text-white rounded-lg text-[14px] font-medium hover:bg-[#0d3638] transition-colors"
            >
              Add Expenses
            </button>
          </div>
        </div>
      </div>

      {/* ── Main Table Card ── */}
      <div className="bg-white rounded-[12px] shadow-[0px_4px_10px_rgba(0,0,0,0.03)] border border-[#E9E9E9]">

        {/* Sub-tabs */}
        <div className="flex px-[20px] border-b border-[#E5E7EB] overflow-x-auto">
          {SUB_TABS.map(tab => (
            <button
              key={tab.key}
              onClick={() => handleSubTabChange(tab.key)}
              className={`py-[16px] px-[14px] cursor-pointer border-b-2 font-medium text-[14px] leading-[20px] whitespace-nowrap transition-colors
                ${activeSubTab === tab.key
                  ? 'border-[#212121] text-[#212121]'
                  : 'border-transparent text-[#666666] hover:text-[#333]'}`}
            >
              {tab.label}
              <span className={`ml-[6px] text-[12px] px-[7px] py-[2px] rounded-full
                ${activeSubTab === tab.key
                  ? 'bg-[#E4F0EB] text-[#235347]'
                  : 'bg-[#F3F4F6] text-[#9CA3AF]'}`}>
                {counts[tab.key]}
              </span>
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="border-b border-[#E5E7EB] text-[12px] font-medium text-[#666666] bg-[#FAFAFA]">
                {isSalary ? (
                  <>
                    <th className="py-[14px] px-[20px]">Date</th>
                    <th className="py-[14px] px-[20px]">Staff Name</th>
                    <th className="py-[14px] px-[20px]">Role</th>
                    <th className="py-[14px] px-[20px]">Salary Month</th>
                    <th className="py-[14px] px-[20px]">Invoice ID</th>
                    <th className="py-[14px] px-[20px]">Payment Method</th>
                    <th className="py-[14px] px-[20px]">Amount</th>
                    <th className="py-[14px] px-[20px]">Action</th>
                  </>
                ) : (
                  <>
                    <th className="py-[14px] px-[20px]">Date</th>
                    <th className="py-[14px] px-[20px]">Sub Category</th>
                    <th className="py-[14px] px-[20px]">Invoice ID</th>
                    <th className="py-[14px] px-[20px]">Paid By</th>
                    <th className="py-[14px] px-[20px]">Payment Method</th>
                    <th className="py-[14px] px-[20px]">Total Bill</th>
                    <th className="py-[14px] px-[20px]">Action</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {pagedRows.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-[40px] text-center text-[14px] text-[#9CA3AF]">
                    No records found
                  </td>
                </tr>
              ) : isSalary ? (
                pagedRows.map((item, idx) => (
                  <tr
                    key={item.id}
                    className={`border-b border-[#E5E7EB] hover:bg-gray-50 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-[#FAFAFA]'}`}
                  >
                    <td className="py-[14px] px-[20px] text-[13px] text-[#212121] whitespace-nowrap">{item.date}</td>
                    <td className="py-[14px] px-[20px] text-[13px] text-[#212121] font-medium whitespace-nowrap">{item['Staff Name']}</td>
                    <td className="py-[14px] px-[20px] whitespace-nowrap">
                      <span className="px-[10px] py-[3px] rounded-full text-[12px] font-medium bg-[#EEF2FF] text-[#4F46E5]">
                        {item['Role']}
                      </span>
                    </td>
                    <td className="py-[14px] px-[20px] text-[13px] text-[#212121] whitespace-nowrap">{item['Salary Month']}</td>
                    <td className="py-[14px] px-[20px] text-[13px] text-[#212121] whitespace-nowrap">{item['Invoice Id']}</td>
                    <td className="py-[14px] px-[20px] whitespace-nowrap">
                      <div className={`px-[10px] py-[4px] w-[120px] rounded-full inline-flex items-center justify-center gap-[6px] text-[12px] font-medium
                        ${item.paymentMethod === 'Card' ? 'bg-[#E1EFFF] text-[#416BFF]' :
                          item.paymentMethod === 'UPI'  ? 'bg-[#EBE2FF] text-[#9D4DFF]' :
                          'bg-[#D8F5E5] text-[#34A853]'}`}>
                        {item.paymentMethod === 'Card' && <div className="w-[12px] h-[8px] bg-[#416BFF] rounded-sm" />}
                        {item.paymentMethod === 'UPI'  && <div className="w-[10px] h-[10px] rounded-full border-2 border-[#9D4DFF]" />}
                        {item.paymentMethod === 'Cash' && <span className="text-[13px] leading-none">₹</span>}
                        {item.paymentMethod}
                      </div>
                    </td>
                    <td className="py-[14px] px-[20px] text-[13px] text-[#212121] font-semibold whitespace-nowrap">{item['Amount']}</td>
                    <td className="py-[14px] px-[20px] whitespace-nowrap">
                      <button
                        onClick={() => handleOpenEdit(item)}
                        className="text-[#3b82f6] hover:text-blue-700 transition-colors"
                      >
                        <Pencil size={17} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                pagedRows.map((item, idx) => (
                  <tr
                    key={item.id}
                    className={`border-b border-[#E5E7EB] hover:bg-gray-50 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-[#FAFAFA]'}`}
                  >
                    <td className="py-[14px] px-[20px] text-[13px] text-[#212121] whitespace-nowrap">{item.date}</td>
                    <td className="py-[14px] px-[20px] text-[13px] text-[#212121] font-medium whitespace-nowrap">{item.subCategory}</td>
                    <td className="py-[14px] px-[20px] text-[13px] text-[#212121] whitespace-nowrap">{item.invoiceId}</td>
                    <td className="py-[14px] px-[20px] whitespace-nowrap">
                      <span className="block text-[13px] text-[#212121] font-medium">{item.paidBy}</span>
                      <span className="text-[11px] text-[#666666]">PID: {item.pid}</span>
                    </td>
                    <td className="py-[14px] px-[20px] whitespace-nowrap">
                      <div className={`px-[12px] py-[4px] w-[120px] rounded-full inline-flex items-center justify-center gap-[6px] text-[12px] font-medium
                        ${item.paymentMethod === 'Card' ? 'bg-[#E1EFFF] text-[#416BFF]' :
                          item.paymentMethod === 'UPI'  ? 'bg-[#EBE2FF] text-[#9D4DFF]' :
                          'bg-[#D8F5E5] text-[#34A853]'}`}>
                        {item.paymentMethod === 'Card' && <div className="w-[12px] h-[8px] bg-[#416BFF] rounded-sm" />}
                        {item.paymentMethod === 'UPI'  && <div className="w-[10px] h-[10px] rounded-full border-2 border-[#9D4DFF]" />}
                        {item.paymentMethod === 'Cash' && <span className="text-[13px] leading-none">₹</span>}
                        {item.paymentMethod}
                      </div>
                    </td>
                    <td className="py-[14px] px-[20px] text-[13px] text-[#212121] font-medium whitespace-nowrap">{item.totalBill}</td>
                    <td className="py-[14px] px-[20px] whitespace-nowrap">
                      <button
                        onClick={() => handleOpenEdit(item)}
                        className="text-[#3b82f6] hover:text-blue-700 transition-colors"
                      >
                        <Pencil size={17} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ── Pagination ── */}
        <Pagination
          safePage={safePage}
          totalPages={totalPages}
          goToPage={goTo}
          pageWindow={pageNumbers}
        />
      </div>

      {showAddModal && (
        <AddExpenseModal
          activeCategory={activeSubTab}
          onClose={() => setShowAddModal(false)}
          onSave={handleSaveExpense}
        />
      )}

      {editingExpense && (
        <EditExpenseModal
          expense={editingExpense}
          onClose={() => setEditingExpense(null)}
          onSave={handleSaveEditedExpense}
        />
      )}
    </div>
  )
}

export default ExpensesTab
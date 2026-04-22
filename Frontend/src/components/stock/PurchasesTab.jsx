import React, { useMemo, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import Pagination from '../common/Pagination'
import {
  EditActionIcon,
  PaymentCardIcon,
  PaymentCashIcon,
  PaymentUpiIcon,
  SearchBarIcon,
} from '../common/CustomUiIcons'

const PurchasesTab = ({ purchasesData }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [dateFilter, setDateFilter] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [methodFilter, setMethodFilter] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const ROWS_PER_PAGE = 6

  const dateOptions = useMemo(() => [...new Set(purchasesData.map((row) => row.date).filter(Boolean))], [purchasesData])
  const categoryOptions = useMemo(() => [...new Set(purchasesData.map((row) => row.category).filter(Boolean))], [purchasesData])
  const methodOptions = useMemo(() => [...new Set(purchasesData.map((row) => row.method).filter(Boolean))], [purchasesData])

  const filteredRows = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()

    return purchasesData.filter((row) => {
      const matchesSearch =
        q.length === 0 ||
        (row.name || '').toLowerCase().includes(q) ||
        (row.invoice || '').toLowerCase().includes(q) ||
        (row.paidByName || '').toLowerCase().includes(q)

      const matchesDate = dateFilter ? row.date === dateFilter : true
      const matchesCategory = categoryFilter ? row.category === categoryFilter : true
      const matchesMethod = methodFilter ? row.method === methodFilter : true

      return matchesSearch && matchesDate && matchesCategory && matchesMethod
    })
  }, [purchasesData, searchQuery, dateFilter, categoryFilter, methodFilter])

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / ROWS_PER_PAGE))
  const safePage = Math.min(currentPage, totalPages)
  const pagedRows = filteredRows.slice((safePage - 1) * ROWS_PER_PAGE, safePage * ROWS_PER_PAGE)

  const goToPage = (nextPage) => {
    setCurrentPage(Math.max(1, Math.min(nextPage, totalPages)))
  }

  const handleFilterChange = (setter, value) => {
    setter(value)
    setCurrentPage(1)
  }

  const pageWindow = useMemo(() => {
    const maxButtons = 7
    const start = Math.max(1, Math.min(safePage - 3, totalPages - (maxButtons - 1)))
    const end = Math.min(totalPages, start + (maxButtons - 1))
    return Array.from({ length: end - start + 1 }, (_, i) => start + i)
  }, [safePage, totalPages])

  return (
    <div className="w-full flex flex-col gap-[20px]">
      
      {/* Purchases Toolbar */}
      <div className="bg-white rounded-[16px] border border-[rgba(130,143,143,0.25)] p-[24px] flex justify-between items-end shadow-sm">
        <div className="w-[300px] h-[48px] bg-[#F3F6F9] rounded-[8px] border border-[#E5E7EB] flex items-center px-[16px] gap-[10px]">
          <SearchBarIcon />
          <input 
            type="text" 
            placeholder="Enter Doctor Name etc..."
            value={searchQuery}
            onChange={(e) => handleFilterChange(setSearchQuery, e.target.value)}
            className="bg-transparent border-none outline-none text-[14px] text-[#212121] placeholder-[#666666] w-full"
          />
        </div>

        <div className="flex gap-[16px]">
          <div className="flex flex-col gap-[8px]">
            <label className="text-[#666666] text-[12px] font-medium">Date</label>
            <div className="h-[44px] bg-[#F3F6F9] rounded-[8px] border border-[#E5E7EB] flex items-center px-[16px] w-[140px] justify-between cursor-pointer relative">
              <select
                className="appearance-none bg-transparent border-none outline-none text-[#212121] text-[14px] w-full"
                value={dateFilter}
                onChange={(e) => handleFilterChange(setDateFilter, e.target.value)}
              >
                <option value="">All</option>
                {dateOptions.map((date) => (
                  <option key={date} value={date}>{date}</option>
                ))}
              </select>
              <ChevronDown size={18} className="text-[#666666]" />
            </div>
          </div>
          <div className="flex flex-col gap-[8px]">
            <label className="text-[#666666] text-[12px] font-medium">Category</label>
            <div className="h-[44px] bg-[#F3F6F9] rounded-[8px] border border-[#E5E7EB] flex items-center px-[16px] w-[160px] justify-between cursor-pointer relative">
              <select
                className="appearance-none bg-transparent border-none outline-none text-[#212121] text-[14px] w-full"
                value={categoryFilter}
                onChange={(e) => handleFilterChange(setCategoryFilter, e.target.value)}
              >
                <option value="">All</option>
                {categoryOptions.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <ChevronDown size={18} className="text-[#666666]" />
            </div>
          </div>
          <div className="flex flex-col gap-[8px]">
            <label className="text-[#666666] text-[12px] font-medium">Payment Method</label>
            <div className="h-[44px] bg-[#F3F6F9] rounded-[8px] border border-[#E5E7EB] flex items-center px-[16px] w-[160px] justify-between cursor-pointer relative">
              <select
                className="appearance-none bg-transparent border-none outline-none text-[#212121] text-[14px] w-full"
                value={methodFilter}
                onChange={(e) => handleFilterChange(setMethodFilter, e.target.value)}
              >
                <option value="">All</option>
                {methodOptions.map((method) => (
                  <option key={method} value={method}>{method}</option>
                ))}
              </select>
              <ChevronDown size={18} className="text-[#666666]" />
            </div>
          </div>
        </div>
      </div>

      {/* Purchases Table */}
      <div className="bg-white rounded-[16px] border border-[rgba(130,143,143,0.25)] flex flex-col shadow-sm overflow-hidden">
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1200px]">
            <thead>
              <tr className="border-b border-[#E5E7EB] bg-[#FAFAFA]">
                <th className="py-[16px] px-[24px] text-[13px] font-medium text-[#666666]">Date</th>
                <th className="py-[16px] px-[24px] text-[13px] font-medium text-[#666666]">Invoice ID</th>
                <th className="py-[16px] px-[24px] text-[13px] font-medium text-[#666666]">Paid By</th>
                <th className="py-[16px] px-[24px] text-[13px] font-medium text-[#666666]">Payment Method</th>
                <th className="py-[16px] px-[24px] text-[13px] font-medium text-[#666666]">Category</th>
                <th className="py-[16px] px-[24px] text-[13px] font-medium text-[#666666]">Name</th>
                <th className="py-[16px] px-[24px] text-[13px] font-medium text-[#666666]">Quantity</th>
                <th className="py-[16px] px-[24px] text-[13px] font-medium text-[#666666]">Unit Price</th>
                <th className="py-[16px] px-[24px] text-[13px] font-medium text-[#666666]">Total Bill</th>
                <th className="py-[16px] px-[24px] text-[13px] font-medium text-[#666666]">Action</th>
              </tr>
            </thead>
            <tbody>
              {pagedRows.map((row, i) => (
                <tr key={i} className="border-b border-[#E5E7EB] hover:bg-[#Fcfcfc] transition-colors bg-white">
                  <td className="py-[16px] px-[24px] text-[14px] text-[#212121]">{row.date}</td>
                  <td className="py-[16px] px-[24px] text-[14px] text-[#212121] font-semibold">{row.invoice}</td>
                  <td className="py-[16px] px-[24px]">
                    {row.paidByName ? (
                      <div className="flex flex-col">
                        <span className="text-[14px] font-medium text-[#212121]">{row.paidByName}</span>
                        <span className="text-[12px] text-[#666666]">{row.paidByPid}</span>
                      </div>
                    ) : null}
                  </td>
                  <td className="py-[16px] px-[24px]">
                    {row.method === 'Card' && (
                      <div className="flex items-center justify-center gap-2 bg-[#E0F2FE] text-[#2563EB] text-[12px] font-medium w-[80px] h-[28px] rounded-[16px]">
                        <PaymentCardIcon /> Card
                      </div>
                    )}
                    {row.method === 'UPI' && (
                      <div className="flex items-center justify-center gap-2 bg-[#F3E8FF] text-[#9333EA] text-[12px] font-medium w-[80px] h-[28px] rounded-[16px]">
                        <PaymentUpiIcon /> UPI
                      </div>
                    )}
                    {row.method === 'Cash' && (
                      <div className="flex items-center justify-center gap-2 bg-[#DCFCE7] text-[#16A34A] text-[12px] font-medium w-[80px] h-[28px] rounded-[16px]">
                        <PaymentCashIcon /> Cash
                      </div>
                    )}
                  </td>
                  <td className="py-[16px] px-[24px] text-[14px] text-[#212121] font-medium">{row.category}</td>
                  <td className="py-[16px] px-[24px] text-[14px] text-[#212121]">{row.name}</td>
                  <td className="py-[16px] px-[24px] text-[14px] text-[#212121] font-medium">{row.qty}</td>
                  <td className="py-[16px] px-[24px] text-[14px] text-[#212121]">{row.price}</td>
                  <td className="py-[16px] px-[24px] text-[14px] text-[#212121]">{row.total}</td>
                  <td className="py-[16px] px-[24px]">
                    <button className="text-[#2563EB] hover:text-blue-700 transition-colors">
                      <EditActionIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <Pagination
          safePage={safePage}
          totalPages={totalPages}
          goToPage={goToPage}
          pageWindow={pageWindow}
        />
      </div>

    </div>
  )
}

export default PurchasesTab

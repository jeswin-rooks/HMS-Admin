import React, { useEffect, useMemo, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import Pagination from '../common/Pagination'
import { SearchBarIcon } from '../common/CustomUiIcons'

const InventoryTab = ({ activeSubTab, onSubTabChange, inventoryData }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const ROWS_PER_PAGE = 6

  const categoryOptions = useMemo(
    () => [...new Set(inventoryData.map((row) => row.category))],
    [inventoryData]
  )

  const tabCounts = useMemo(() => {
    const counts = { available: 0, low_stock: 0, out_of_stock: 0 }
    inventoryData.forEach((row) => {
      if (counts[row.status] !== undefined) {
        counts[row.status] += 1
      }
    })
    return counts
  }, [inventoryData])

  const filteredRows = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    return inventoryData.filter((row) => {
      const matchesSubTab = row.status === activeSubTab
      const matchesCategory = categoryFilter ? row.category === categoryFilter : true
      const matchesSearch =
        q.length === 0 ||
        row.name.toLowerCase().includes(q) ||
        row.batch.toLowerCase().includes(q)

      return matchesSubTab && matchesCategory && matchesSearch
    })
  }, [inventoryData, activeSubTab, categoryFilter, searchQuery])

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / ROWS_PER_PAGE))
  const safePage = Math.min(currentPage, totalPages)
  const pagedRows = filteredRows.slice((safePage - 1) * ROWS_PER_PAGE, safePage * ROWS_PER_PAGE)

  useEffect(() => {
    setCurrentPage(1)
  }, [activeSubTab, searchQuery, categoryFilter])

  const goToPage = (nextPage) => {
    setCurrentPage(Math.max(1, Math.min(nextPage, totalPages)))
  }

  const pageWindow = useMemo(() => {
    const maxButtons = 7
    const start = Math.max(1, Math.min(safePage - 3, totalPages - (maxButtons - 1)))
    const end = Math.min(totalPages, start + (maxButtons - 1))
    return Array.from({ length: end - start + 1 }, (_, i) => start + i)
  }, [safePage, totalPages])

  return (
    <div className="w-full flex flex-col gap-[20px]">

      {/* Toolbar */}
      <div className="w-full p-6 flex justify-between items-end bg-white rounded-[16px] border border-[rgba(130,143,143,0.25)] shadow-sm">
        <div className="w-[300px] h-[48px] bg-[#F3F6F9] rounded-[8px] border border-[#E5E7EB] flex items-center px-[16px] gap-[10px]">
          <SearchBarIcon />
          <input 
            type="text" 
            placeholder="Enter Doctor Name etc..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none outline-none text-[14px] text-[#212121] placeholder-[#666666] w-full"
          />
        </div>

        <div className="flex flex-col gap-[8px]">
          <label className="text-[#666666] text-[12px] font-medium">Category</label>
          <div className="h-[44px] bg-[#F3F6F9] rounded-[8px] border border-[#E5E7EB] flex items-center px-[16px] w-[180px] justify-between cursor-pointer relative">
            <select
              className="appearance-none bg-transparent border-none outline-none text-[#212121] text-[14px] w-full"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="">All</option>
              {categoryOptions.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <ChevronDown size={18} className="text-[#666666]" />
          </div>
        </div>
      </div>

      {/* Sub tabs & Table */}
      <div className="flex flex-col bg-white rounded-[16px] border border-[rgba(130,143,143,0.25)] shadow-sm overflow-hidden">

        <div className="flex gap-[30px] px-[24px] border-b border-[rgba(130,143,143,0.25)] h-[48px] items-center">
          <span 
            onClick={() => onSubTabChange('available')}
            className={`text-[14px] font-medium cursor-pointer h-full flex items-center border-b-2 ${activeSubTab === 'available' ? 'text-[#212121] border-[#212121]' : 'text-[#666666] border-transparent'}`}
          >
            Available ({tabCounts.available})
          </span>
          <span 
            onClick={() => onSubTabChange('low_stock')}
            className={`text-[14px] font-medium cursor-pointer h-full flex items-center border-b-2 ${activeSubTab === 'low_stock' ? 'text-[#212121] border-[#212121]' : 'text-[#666666] border-transparent'}`}
          >
            Low Stock ({tabCounts.low_stock})
          </span>
          <span 
            onClick={() => onSubTabChange('out_of_stock')}
            className={`text-[14px] font-medium cursor-pointer h-full flex items-center border-b-2 ${activeSubTab === 'out_of_stock' ? 'text-[#212121] border-[#212121]' : 'text-[#666666] border-transparent'}`}
          >
            Out Of Stock ({tabCounts.out_of_stock})
          </span>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="border-b border-[rgba(130,143,143,0.25)] bg-[#F5F7FA]">
                <th className="py-[16px] px-[24px] text-[13px] font-medium text-[#666666]">Name</th>
                <th className="py-[16px] px-[24px] text-[13px] font-medium text-[#666666]">Category</th>
                <th className="py-[16px] px-[24px] text-[13px] font-medium text-[#666666]">Stock</th>
                <th className="py-[16px] px-[24px] text-[13px] font-medium text-[#666666]">Batches</th>
                <th className="py-[16px] px-[24px] text-[13px] font-medium text-[#666666]">Purchase Date</th>
              </tr>
            </thead>
            <tbody>
              {pagedRows.map((row, i) => (
                <tr key={i} className={`border-b border-[#E5E7EB] hover:bg-white transition-colors ${i % 2 === 0 ? 'bg-[#FAFAFA]' : 'bg-white'}`}>
                  <td className="py-[16px] px-[24px] text-[14px] text-[#212121]">{row.name}</td>
                  <td className="py-[16px] px-[24px] text-[14px] text-[#212121]">{row.category}</td>
                  <td className="py-[16px] px-[24px] text-[14px] text-[#212121]">{row.stock}</td>
                  <td className="py-[16px] px-[24px] text-[14px] text-[#212121] font-medium">{row.batch}</td>
                  <td className="py-[16px] px-[24px] text-[14px] text-[#212121]">{row.date}</td>
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

export default InventoryTab

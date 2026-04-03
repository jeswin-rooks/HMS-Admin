import React, { useState, useMemo } from 'react'
import { Search } from 'lucide-react'
import billingData from '../../data/billing.json'

import PackageCard          from './PackageCard'
import CreatePackageModal   from './CreatePackageModal'
import PackageDetailModal   from './PackageDetailModal'

const CARDS_PER_PAGE = 10

const BillingTab = () => {
  const [packages, setPackages]         = useState(billingData)
  const [searchQuery, setSearchQuery]   = useState('')
  const [currentPage, setCurrentPage]   = useState(1)
  const [showCreate, setShowCreate]     = useState(false)
  const [viewPkg, setViewPkg]           = useState(null)   // for detail modal

  /* ── Filter by search ── */
  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase()
    if (!q) return packages
    return packages.filter(p =>
      p.name.toLowerCase().includes(q) || p.type.toLowerCase().includes(q)
    )
  }, [packages, searchQuery])

  /* ── Pagination ── */
  const totalPages   = Math.max(1, Math.ceil(filtered.length / CARDS_PER_PAGE))
  const safePage     = Math.min(currentPage, totalPages)
  const pagedCards   = filtered.slice((safePage - 1) * CARDS_PER_PAGE, safePage * CARDS_PER_PAGE)

  const goTo = (p) => setCurrentPage(Math.max(1, Math.min(p, totalPages)))

  const pageNumbers = useMemo(() => {
    const pages = []
    const start = Math.max(1, safePage - 2)
    const end   = Math.min(totalPages, start + 4)
    for (let i = start; i <= end; i++) pages.push(i)
    return pages
  }, [safePage, totalPages])

  /* ── Handlers ── */
  const handleSave = (newPkg) => {
    setPackages(prev => [...prev, newPkg])
  }

  const handleEdit = (pkg) => {
    setViewPkg(null)
    // You can open an edit modal here; for now we open the create modal pre-filled
    // For simplicity we just close the detail view
  }

  return (
    <>
      {/* ── Toolbar ── */}
      <div className="bg-white rounded-[12px] p-[20px] flex justify-between items-center shadow-[0px_4px_10px_rgba(0,0,0,0.03)] border border-[#E9E9E9]">
        <div className="flex items-center gap-[10px] w-[300px] h-[44px] bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg px-[14px]">
          <Search size={16} className="text-[#9CA3AF] flex-shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1) }}
            placeholder="Enter Doctor Name etc..."
            className="bg-transparent border-none outline-none text-[13px] text-[#4B5563] w-full"
          />
        </div>

        <button
          onClick={() => setShowCreate(true)}
          className="h-[40px] px-[20px] bg-[#051F20] text-white rounded-[8px] text-[13px] font-medium hover:bg-[#0d3638] transition-colors"
        >
          Create Package
        </button>
      </div>

      {/* ── Package Grid ── */}
      <div className="bg-white rounded-[12px] border border-[#E9E9E9] shadow-[0px_4px_10px_rgba(0,0,0,0.03)] overflow-hidden">
        {pagedCards.length === 0 ? (
          <div className="flex items-center justify-center py-[60px] text-[14px] text-[#9CA3AF]">
            No packages found
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-[1px] bg-[#F3F4F6]">
            {pagedCards.map((pkg, idx) => (
              <div key={pkg.id} className="bg-white">
                <PackageCard
                  pkg={pkg}
                  index={(safePage - 1) * CARDS_PER_PAGE + idx + 1}
                  onClick={(p) => setViewPkg(p)}
                />
              </div>
            ))}
          </div>
        )}

        {/* ── Pagination ── */}
        <div className="py-[14px] px-[20px] flex items-center justify-between border-t border-[#E5E7EB] bg-[#FAFAFA]">
          <span className="text-[12px] text-[#9CA3AF]">
            Showing {filtered.length === 0 ? 0 : (safePage - 1) * CARDS_PER_PAGE + 1}–{Math.min(safePage * CARDS_PER_PAGE, filtered.length)} of {filtered.length} packages
          </span>

          <div className="flex gap-[6px] items-center">
            <button
              onClick={() => goTo(1)} disabled={safePage === 1}
              className="w-[30px] h-[30px] rounded-full bg-white border border-[#E5E7EB] flex items-center justify-center text-[#666666] text-[11px] shadow-sm hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >|&lt;</button>
            <button
              onClick={() => goTo(safePage - 1)} disabled={safePage === 1}
              className="w-[30px] h-[30px] rounded-full bg-white border border-[#E5E7EB] flex items-center justify-center text-[#666666] text-[11px] shadow-sm hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >&lt;</button>

            {pageNumbers.map(num => (
              <button
                key={num}
                onClick={() => goTo(num)}
                className={`w-[30px] h-[30px] rounded-full flex items-center justify-center text-[12px] font-medium transition-colors
                  ${num === safePage
                    ? 'bg-[#D6F1E6] border border-[#235347] text-[#235347]'
                    : 'bg-[#E5E7EB] text-[#212121] hover:bg-gray-300 cursor-pointer'}`}
              >
                {num}
              </button>
            ))}

            <button
              onClick={() => goTo(safePage + 1)} disabled={safePage === totalPages}
              className="w-[30px] h-[30px] rounded-full bg-white border border-[#E5E7EB] flex items-center justify-center text-[#666666] text-[11px] shadow-sm hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >&gt;</button>
            <button
              onClick={() => goTo(totalPages)} disabled={safePage === totalPages}
              className="w-[30px] h-[30px] rounded-full bg-white border border-[#E5E7EB] flex items-center justify-center text-[#666666] text-[11px] shadow-sm hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >&gt;|</button>
          </div>
        </div>
      </div>

      {/* ── Modals ── */}
      {showCreate && (
        <CreatePackageModal
          onClose={() => setShowCreate(false)}
          onSave={handleSave}
        />
      )}

      {viewPkg && (
        <PackageDetailModal
          pkg={viewPkg}
          onClose={() => setViewPkg(null)}
          onEdit={handleEdit}
        />
      )}
    </>
  )
}

export default BillingTab
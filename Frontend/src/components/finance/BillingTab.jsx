import React, { useMemo, useState } from 'react'
import { Plus, Search, ChevronDown, Check, Edit2, Download, Trash2, Tag, Smartphone, CreditCard, Banknote } from 'lucide-react'
import Pagination from '../common/Pagination'
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] p-[16px] bg-[#F8FAFC]">
            {pagedCards.map((pkg, idx) => (
              <PackageCard
                key={pkg.id}
                pkg={pkg}
                index={(safePage - 1) * CARDS_PER_PAGE + idx + 1}
                onClick={(p) => setViewPkg(p)}
              />
            ))}
          </div>
        )}

        {/* ── Pagination ── */}
        <Pagination
          safePage={safePage}
          totalPages={totalPages}
          goToPage={goTo}
          pageWindow={pageNumbers}
        />
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
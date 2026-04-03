import React, { useEffect } from 'react'
import { X } from 'lucide-react'
import PackageSummaryPanel from './PackageSummaryPanel'

const InfoRow = ({ label, value }) => (
  <div className="flex flex-col gap-[2px]">
    <span className="text-[11px] text-[#9CA3AF] uppercase tracking-wide">{label}</span>
    <span className="text-[13px] font-semibold text-[#212121]">{value ?? '-'}</span>
  </div>
)

const SectionCard = ({ title, children }) => (
  <div className="border border-[#E5E7EB] rounded-[10px] p-[14px]">
    <h4 className="text-[12px] font-bold text-[#212121] mb-[12px] pb-[6px] border-b border-[#F3F4F6]">{title}</h4>
    <div className="grid grid-cols-2 gap-[12px]">
      {children}
    </div>
  </div>
)

const PackageDetailModal = ({ pkg, onClose, onEdit }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  if (!pkg) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 overflow-y-auto py-[30px]">
      <div className="bg-white rounded-[16px] w-[920px] max-w-[95vw] shadow-2xl">

        {/* Header */}
        <div className="flex justify-between items-start px-[28px] pt-[24px] pb-[18px] border-b border-[#E5E7EB]">
          <div>
            <h2 className="text-[18px] font-bold text-[#212121]">{pkg.name}</h2>
            <p className="text-[12px] text-[#9CA3AF] mt-[2px]">
              View complete information about this billing package, including included services, charges, and conditions.
            </p>
          </div>
          <button onClick={onClose} className="text-[#9CA3AF] hover:text-[#212121] transition-colors mt-[2px]">
            <X size={20} />
          </button>
        </div>

        {/* Body — two columns */}
        <div className="flex gap-[24px] p-[28px]">

          {/* LEFT column */}
          <div className="flex-1 flex flex-col gap-[14px] min-w-0">

            {/* Basic Info */}
            <SectionCard title="Basic Package Information">
              <InfoRow label="Days Included"    value={pkg.daysIncluded} />
              <InfoRow label="Base Price"        value={`₹${(pkg.basePrice || 0).toLocaleString('en-IN')}`} />
              <InfoRow label="Intra Day Charge"  value={`₹${(pkg.intraDayCharge || 0).toLocaleString('en-IN')}`} />
              <InfoRow label="Package Type"      value={pkg.type} />
            </SectionCard>

            {/* Medicines */}
            <SectionCard title="Medicines">
              <InfoRow label="Unit Type"            value={pkg.medicines?.unitType} />
              <InfoRow label="Unit Value"           value={pkg.medicines?.unitValue} />
              <InfoRow label="Quantity Available"   value={pkg.medicines?.quantityAvailable} />
              <InfoRow label="Total Available Cost" value={pkg.medicines?.totalAvailableCost ? `₹${pkg.medicines.totalAvailableCost.toLocaleString('en-IN')}` : '-'} />
            </SectionCard>

            {/* Therapy */}
            <SectionCard title="Therapy">
              <InfoRow label="Sessions Included"  value={pkg.therapy?.sessionsIncluded} />
              <InfoRow label="Extra Session Cost" value={pkg.therapy?.extraSessionCost ? `₹${pkg.therapy.extraSessionCost.toLocaleString('en-IN')}` : '-'} />
            </SectionCard>

            {/* Food & Diet */}
            <SectionCard title="Food & Diet">
              <InfoRow label="Diet Type"    value={pkg.foodAndDiet?.dietType} />
              <InfoRow label="Meals Per Day" value={pkg.foodAndDiet?.mealsPerDay} />
            </SectionCard>

            {/* Additional Charges */}
            <SectionCard title="Additional Charges">
              <InfoRow label="Additional Charge" value={pkg.additionalCharges?.additionalCharge ? `₹${pkg.additionalCharges.additionalCharge.toLocaleString('en-IN')}` : '-'} />
              <InfoRow label="Adjustment Charge" value={pkg.additionalCharges?.adjustmentCharge ? `₹${pkg.additionalCharges.adjustmentCharge.toLocaleString('en-IN')}` : '₹0'} />
            </SectionCard>

            {/* Doctor & Nursing */}
            <div className="border border-[#E5E7EB] rounded-[10px] p-[14px]">
              <h4 className="text-[12px] font-bold text-[#212121] mb-[12px] pb-[6px] border-b border-[#F3F4F6]">Doctor & Nursing Charges</h4>
              <div className="grid grid-cols-3 gap-[12px]">
                <InfoRow label="Consultation Rate" value={`₹${(pkg.doctorAndNursing?.consultationRate || 0).toLocaleString('en-IN')}`} />
                <InfoRow label="Daily Rate"        value={`₹${(pkg.doctorAndNursing?.dailyRate || 0).toLocaleString('en-IN')}`} />
                <InfoRow label="Nursing"           value={`₹${(pkg.doctorAndNursing?.nursing || 0).toLocaleString('en-IN')}`} />
              </div>
            </div>
          </div>

          {/* RIGHT column — Summary */}
          <div className="w-[240px] flex-shrink-0 flex flex-col gap-[16px]">
            <PackageSummaryPanel summary={pkg.packageSummary || {}} />

            {/* Package Discount callout */}
            <div className="bg-[#FFF5F5] border border-[#FED7D7] rounded-[8px] p-[12px]">
              <p className="text-[11px] text-[#9CA3AF] uppercase">Package Discount</p>
              <p className="text-[15px] font-bold text-[#E53E3E] mt-[2px]">
                -₹{Math.abs(pkg.packageSummary?.packageDiscount || 0).toLocaleString('en-IN')}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-[12px] px-[28px] pb-[24px] pt-[8px] border-t border-[#E5E7EB]">
          <button
            onClick={onClose}
            className="h-[40px] px-[20px] rounded-[8px] border border-[#E5E7EB] text-[13px] font-medium text-[#666666] hover:bg-[#F9FAFB] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onEdit(pkg)}
            className="h-[40px] px-[24px] rounded-[8px] bg-[#051F20] text-white text-[13px] font-medium hover:bg-[#0d3638] transition-colors"
          >
            Edit Package
          </button>
        </div>
      </div>
    </div>
  )
}

export default PackageDetailModal

import React from 'react'

const SummaryRow = ({ label, value, accent }) => (
  <div className="flex justify-between items-center py-[5px] border-b border-[#F3F4F6] last:border-0">
    <span className="text-[12px] text-[#666666]">{label}</span>
    <span className={`text-[13px] font-medium ${accent ? 'text-[#099a34]' : 'text-[#212121]'}`}>
      {accent && value < 0 ? `-₹${Math.abs(value)}` : `₹${value}`}
    </span>
  </div>
)

const PackageSummaryPanel = ({ summary }) => {
  const total =
    (summary.basePackage || 0) +
    (summary.roomCharges || 0) +
    (summary.medicines || 0) +
    (summary.therapy || 0) +
    (summary.foodAndDiet || 0) +
    (summary.additionalCharges || 0) +
    (summary.doctorNursingCharges || 0) +
    (summary.packageDiscount || 0)

  return (
    <div className="bg-[#F9FAFB] rounded-[10px] border border-[#E5E7EB] p-[16px] flex flex-col gap-[2px]">
      <h4 className="text-[13px] font-semibold text-[#212121] mb-[8px]">Package Summary</h4>
      <SummaryRow label="Base Package"            value={summary.basePackage || 0} />
      <SummaryRow label="Room Charges"            value={summary.roomCharges || 0} />
      <SummaryRow label="Medicines"               value={summary.medicines || 0} />
      <SummaryRow label="Therapy"                 value={summary.therapy || 0} />
      <SummaryRow label="Food & Diet"             value={summary.foodAndDiet || 0} />
      <SummaryRow label="Additional Charges"      value={summary.additionalCharges || 0} />
      <SummaryRow label="Doctor & Nursing Charges" value={summary.doctorNursingCharges || 0} />
      <SummaryRow label="Package Discount"        value={summary.packageDiscount || 0} accent />

      <div className="mt-[10px] pt-[10px] border-t-2 border-[#235347] flex justify-between items-center">
        <span className="text-[13px] font-bold text-[#1D4ED8]">Final Package Price</span>
        <span className="text-[16px] font-bold text-[#1D4ED8]">
          ₹{total.toLocaleString('en-IN')}
        </span>
      </div>
    </div>
  )
}

export default PackageSummaryPanel

import React from 'react'

const PackageCard = ({ pkg, index, onClick }) => {
  return (
    <div
      onClick={() => onClick(pkg)}
      className="bg-[#ECEFF3] border border-[#DCE3EA] rounded-[10px] px-[8px] py-[12px] flex items-center justify-between cursor-pointer hover:bg-[#E6EDF4] transition-colors duration-200"
    >
      <div className="flex items-center gap-[14px]">
        <div className="w-[40px] h-[40px] rounded-full bg-[#F5F7FA] flex items-center justify-center">
          <span className="text-[18px] leading-none font-semibold text-[#2B2B2B]">{index}</span>
        </div>
        <div className="flex flex-col gap-[3px]">
          <span className="text-[16px] leading-tight font-semibold text-[#2B2B2B]">
            {pkg.name}
          </span>
          <span className="text-[12px] text-[#6B7280]">#{pkg.id}</span>
        </div>
      </div>

      <div className="flex flex-col items-end gap-[2px]">
        <span className="text-[10px] text-[#7A838F]">Package Price</span>
        <span className="text-[16px] leading-none font-bold text-[#1F2937]">
          ₹{pkg.packageFee.toLocaleString('en-IN')}
        </span>
      </div>
    </div>
  )
}

export default PackageCard

import React from 'react'

const PackageCard = ({ pkg, index, onClick }) => {
  return (
    <div
      onClick={() => onClick(pkg)}
      className="bg-white p-[18px] flex items-center justify-between cursor-pointer hover:bg-[#F0FAF5] transition-all duration-200 group"
    >
      {/* Left: index + info */}
      <div className="flex items-center gap-[16px]">
        <span className="text-[15px] font-semibold text-[#9CA3AF] min-w-[22px]">{index}</span>
        <div className="flex flex-col gap-[3px]">
          <span className="text-[14px] font-semibold text-[#212121] group-hover:text-[#235347] transition-colors leading-tight">
            {pkg.name}
          </span>
          <span className="text-[12px] text-[#9CA3AF]">{pkg.type}</span>
        </div>
      </div>

      {/* Right: fee */}
      <div className="flex flex-col items-end gap-[2px]">
        <span className="text-[11px] text-[#9CA3AF] uppercase tracking-wide">Package Fee</span>
        <span className="text-[14px] font-bold text-[#212121] group-hover:text-[#235347] transition-colors">
          ₹{pkg.packageFee.toLocaleString('en-IN')}
        </span>
      </div>
    </div>
  )
}

export default PackageCard

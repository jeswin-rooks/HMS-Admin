import React from 'react'

const FinanceStats = ({ stats }) => {
  return (
    <div className="flex gap-[20px] w-full justify-between items-stretch">
      {stats.map((stat, index) => (
        <div 
          key={index}
          className="flex-1 bg-white rounded-lg p-[20px] shadow-[0px_4px_10px_rgba(0,0,0,0.03)] border border-[#E9E9E9]"
        >
          <div className="flex justify-between items-start mb-[16px]">
            <span className="text-[#666666] font-medium text-[14px] leading-[20px]">{stat.title}</span>
            <span className="text-[#F14B4B] font-bold text-[14px] leading-[20px]">{stat.percentage}</span>
          </div>
          <div className="text-[28px] font-bold text-[#212121] leading-[36px]">
            {stat.amount}
          </div>
        </div>
      ))}
    </div>
  )
}

export default FinanceStats
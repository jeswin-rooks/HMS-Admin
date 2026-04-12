import React from 'react'

const FinanceStats = ({ stats }) => {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      {stats.map((stat, index) => (
        <div 
          key={index}
          className="bg-[#EDFFF0] rounded-xl p-6 flex flex-col justify-between shadow-[0px_4px_8px_3px_rgba(0,0,0,0.15),0px_1px_3px_rgba(0,0,0,0.3)] border border-[#cad8cf] h-[166px]"
        >
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-[#666666] font-medium text-[18px]">{stat.title}</h3>
            <span className="text-[#F14B4B] font-bold text-[14px] leading-5">{stat.percentage}</span>
          </div>
          <p className="text-[36px] font-bold text-[#212121] leading-none">
            {stat.amount}
          </p>
        </div>
      ))}
    </div>
  )
}

export default FinanceStats
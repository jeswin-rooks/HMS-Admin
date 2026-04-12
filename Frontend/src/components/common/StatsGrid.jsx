import React from 'react'


const StatsGrid = ({ stats = [], columns = 4 }) => {
  const colClass = {
    4: 'lg:grid-cols-4',
    5: 'lg:grid-cols-5',
  }[columns] ?? 'lg:grid-cols-4'

  return (
    <div className={`w-full grid grid-cols-1 md:grid-cols-2 ${colClass} gap-6`}>
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="bg-[#EDFFF0] rounded-xl p-6 flex flex-col justify-between shadow-[0px_4px_8px_3px_rgba(0,0,0,0.15),0px_1px_3px_rgba(0,0,0,0.3)] border border-[#cad8cf] h-[150px]"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-[#666666] font-medium text-[18px]">{stat.title}</h3>

            {/* Percentage badge (Finance) */}
            {stat.percentage && (
              <span className="text-[#F14B4B] font-bold text-[14px] leading-5">
                {stat.percentage}
              </span>
            )}

            {/* Icon circle (Staff / Stock / Dashboard) */}
            {stat.icon && !stat.percentage && (
              <div
                className={`w-[50px] h-[50px] rounded-full flex items-center justify-center ${stat.iconBg ?? ''} ${stat.iconColor ?? ''}`}
              >
                {stat.icon}
              </div>
            )}
          </div>

          <p className="text-[36px] font-bold text-[#212121] leading-none">
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  )
}

export default StatsGrid

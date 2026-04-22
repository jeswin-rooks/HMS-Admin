import React from 'react'


const StatsGrid = ({ stats = [], columns = 4 }) => {
  const colClass = {
    4: 'lg:grid-cols-4',
    5: 'lg:grid-cols-5',
  }[columns] ?? 'lg:grid-cols-4'

  return (
    <div className={`w-full grid grid-cols-1 md:grid-cols-2 ${colClass} lg:gap-5 2xl:gap-[30px]`}>
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="bg-[#EDFFF0] rounded-[12px] lg:p-4 xl:p-5 2xl:p-6 flex flex-col justify-between lg:h-[132px] xl:h-[150px] 2xl:h-[166px] shadow-[0px_4px_8px_3px_rgba(0,0,0,0.15),0px_1px_3px_rgba(0,0,0,0.3)]"
        >
          <div className="flex justify-between items-center lg:h-[34px] xl:h-[42px] 2xl:h-[50px]">
            <h3 className="text-[#666666] font-medium lg:text-[14px] xl:text-[16px] 2xl:text-[18px] leading-[27px]">{stat.title}</h3>

            {/* Percentage badge (Finance) */}
            {stat.percentage && (
              <span className="text-[#F14B4B] font-bold text-[14px] leading-5">
                {stat.percentage}
              </span>
            )}

            {/* Icon circle (Staff / Stock / Dashboard) */}
            {stat.icon && !stat.percentage && (
              <div
                className={`lg:w-[38px] lg:h-[38px] xl:w-[44px] xl:h-[44px] 2xl:w-[50px] 2xl:h-[50px] rounded-[33px] flex items-center justify-center ${stat.iconBg ?? ''} ${stat.iconColor ?? ''}`}
              >
                {stat.icon}
              </div>
            )}
          </div>

          <p className="lg:text-[42px] xl:text-[34px] 2xl:text-[36px] font-bold text-[#212121] leading-[24px]">
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  )
}

export default StatsGrid

import React from 'react'

const StaffStats = ({ stats }) => {
  const getIconContent = (iconColor) => {
    switch (iconColor) {
      case 'blue':
        return (
          <div className="w-[50px] h-[50px] rounded-full bg-[#DBEAFE] flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" fill="#1D4ED8"/>
              <path d="M12 14C7.58172 14 4 16.6863 4 20V21H20V20C20 16.6863 16.4183 14 12 14Z" fill="#1D4ED8"/>
            </svg>
          </div>
        );
      case 'yellow':
        return (
          <div className="w-[50px] h-[50px] rounded-full bg-[#FFF3CD] flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 13L9 17L19 7" stroke="#FFC107" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        );
      case 'green':
        return (
          <div className="w-[50px] h-[50px] rounded-full bg-[#D4EDDA] flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-[#28A745]"></div>
          </div>
        );
      case 'red':
        return (
          <div className="w-[50px] h-[50px] rounded-full bg-[#FAD7DA] flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-[#E63946]"></div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div 
          key={index}
          className="bg-[#EDFFF0] rounded-xl p-6 flex flex-col justify-between shadow-[0px_4px_8px_3px_rgba(0,0,0,0.15),0px_1px_3px_rgba(0,0,0,0.3)] border border-[#cad8cf] h-[166px]"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-[#666666] font-medium text-[18px]">{stat.title}</h3>
            {getIconContent(stat.iconColor)}
          </div>
          <p className="text-[36px] font-bold text-[#212121] leading-none">
            {stat.amount}
          </p>
        </div>
      ))}
    </div>
  )
}

export default StaffStats
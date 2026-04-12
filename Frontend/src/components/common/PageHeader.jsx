import React from 'react'

const PageHeader = ({ title = 'Welcome Back', subtitle = 'Hello Name' }) => {
  return (
    <div className="h-[28vh] navbar w-full">
      <div className="w-[1360px] max-w-full mx-auto px-5 xl:px-0 flex justify-between items-start">
        <div className="flex flex-col">
          <span className="text-[#666666] text-[16px] font-medium leading-[24px]">{subtitle}</span>
          <span className="text-[#212121] text-[24px] font-bold leading-[36px]">{title}</span>
        </div>
      </div>
    </div>
  )
}

export default PageHeader

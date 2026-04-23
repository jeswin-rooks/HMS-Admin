import React from 'react'

const PageHeader = ({ title = 'Welcome Back', subtitle = 'Hello Name' }) => {
  return (
    <div className="w-full h-[224px] bg-[#ACE3CE]">
      <div className="w-full max-w-[1440px] mx-auto px-[20px] xl:px-[30px] h-full flex items-start pt-[10px]">
        <div className="w-[182px] h-[66px] flex flex-col mt-[20px]">
          <span className="text-[#666666] text-[20px] font-semibold leading-[30px]">{subtitle}</span>
          <span className="text-[#212121] text-[24px] font-semibold leading-[36px]">{title}</span>
        </div>
      </div>
    </div>
  )
}

export default PageHeader

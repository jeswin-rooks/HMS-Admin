import React from 'react'

const PageHeader = ({ title = 'Welcome Back', subtitle = 'Hello Name' }) => {
  return (
  <div className="w-full xl:h-[204px] 2xl:h-[224px] bg-[#ACE3CE] xl:px-0 2xl:px-[40px] py-[10px]">
      <div className="w-full xl:max-w-full 2xl:max-w-[1360px] mx-auto h-full flex items-start">
        <div className="xl:w-[170px] 2xl:w-[182px] h-[66px] flex flex-col">
          <span className="text-[#666666] xl:text-[18px] 2xl:text-[20px] font-semibold leading-[30px]">{subtitle}</span>
          <span className="text-[#212121] text-[24px] font-semibold leading-[36px]">{title}</span>
        </div>
      </div>
    </div>
  )
}

export default PageHeader

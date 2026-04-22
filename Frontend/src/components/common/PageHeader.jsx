import React from 'react'

const PageHeader = ({ title = 'Welcome Back', subtitle = 'Hello Name' }) => {
  return (
    <div className="w-full h-[224px] bg-[#ACE3CE] px-[40px] py-[10px]">
      <div className="w-full max-w-[1360px] mx-auto h-full flex items-start">
        <div className="w-[182px] h-[66px] flex flex-col">
          <span className="text-[#666666] text-[20px] font-semibold leading-[30px]">{subtitle}</span>
          <span className="text-[#212121] text-[24px] font-semibold leading-[36px]">{title}</span>
        </div>
      </div>
    </div>
  )
}

export default PageHeader

import React from 'react'
import PageHeader from './PageHeader'
import StatsGrid from './StatsGrid'

const PageLayout = ({ stats = [], statsColumns = 4, children }) => {
  return (
    <div className="flex-1 flex flex-col min-h-[calc(100vh-88px)] font-['Poppins']">
      <PageHeader />
  <div className="w-full xl:max-w-full 2xl:max-w-[1440px] mx-auto xl:px-0 2xl:px-[40px] xl:-mt-[68px] 2xl:-mt-[83px] flex flex-col gap-[30px]">
        <div className="w-full xl:max-w-full 2xl:max-w-[1360px] mx-auto flex flex-col gap-[30px]">
          <StatsGrid stats={stats} columns={statsColumns} />
          {children}
        </div>
      </div>

  <footer className="w-full bg-white border-t border-[rgba(130,143,143,0.25)] xl:px-0 2xl:px-[40px] py-[24px] mt-auto">
        <div className="w-full xl:max-w-full 2xl:max-w-[1360px] mx-auto h-[24px] flex items-center justify-center text-center text-[13px] leading-[24px] text-[#666666]">
          © 2024 HospitalMS Multi-Branch Enterprise Suite. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

export default PageLayout

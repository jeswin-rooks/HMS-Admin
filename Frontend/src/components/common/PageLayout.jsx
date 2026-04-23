import React from 'react'
import PageHeader from './PageHeader'
import StatsGrid from './StatsGrid'

const PageLayout = ({
  stats = [],
  statsColumns = 4,
  hidePageHeader = false,
  hideStats = false,
  children
}) => {
  const shouldPullUpContent = !hidePageHeader

  return (
    <div className="flex-1 flex flex-col min-h-[calc(100vh-88px)] font-['Poppins']">
      {!hidePageHeader && <PageHeader />}
      <div className={`w-full max-w-[1440px] mx-auto px-[20px] xl:px-[30px] flex flex-col gap-[30px] ${shouldPullUpContent ? '-mt-[83px]' : 'mt-[20px]'}`}>
        <div className="w-full flex flex-col gap-[30px]">
          {!hideStats && <StatsGrid stats={stats} columns={statsColumns} />}
          {children}
        </div>
      </div>

      <footer className="w-full bg-transparent px-[20px] xl:px-[30px] py-[24px] mt-auto">
        <div className="w-full h-[24px] flex items-center justify-center text-center text-[13px] leading-[24px] text-[#666666]">
          © 2024 HospitalMS Multi-Branch Enterprise Suite. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

export default PageLayout

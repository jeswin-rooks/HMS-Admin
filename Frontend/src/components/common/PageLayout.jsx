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
  return (
    <div className="flex-1 flex flex-col min-h-[calc(100vh-80px)] font-['Poppins']">
      {!hidePageHeader && <PageHeader />}
      <div className={`flex-1 flex justify-center pb-[50px] ${hidePageHeader && hideStats ? '' : 'relative'}`}>
        <div className={`w-full max-w-full flex flex-col items-start z-10 gap-[30px] px-5 xl:px-0 ${hidePageHeader && hideStats ? 'pt-5' : 'absolute top-[-90px]'}`}>
          {!hideStats && <StatsGrid stats={stats} columns={statsColumns} />}
          {children}
          
          <footer className=" w-full flex justify-center text-center text-[13px] text-[#666666] py-[20px] mt-auto bg-white">
            © 2024 HospitalMS Multi-Branch Enterprise Suite. All rights reserved.
          </footer>
        </div>
      </div>
    </div>
  )
}

export default PageLayout

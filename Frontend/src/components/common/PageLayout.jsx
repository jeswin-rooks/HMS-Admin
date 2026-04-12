import React from 'react'
import PageHeader from './PageHeader'
import StatsGrid from './StatsGrid'

const PageLayout = ({ stats = [], statsColumns = 4, children }) => {
  return (
    <div className="flex-1 flex flex-col min-h-[calc(100vh-80px)] font-['Poppins']">
      <PageHeader />
      <div className="flex-1 flex justify-center pb-[50px] relative">
        <div className="w-[1360px] max-w-full flex items-start z-10 flex-col gap-[30px] absolute top-[-90px] px-5 xl:px-0">
          <StatsGrid stats={stats} columns={statsColumns} />
          {children}
        </div>
      </div>
    </div>
  )
}

export default PageLayout

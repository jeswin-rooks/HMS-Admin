import React from 'react'

const StaffHeader = () => {
  return (
    <div className="h-56 bg-[#C5EFE2] w-full pt-10">
      <div className="w-[1360px] max-w-full mx-auto px-5 xl:px-0 flex justify-between items-start">
        <div className="flex flex-col">
          <span className="text-[#666666] text-[16px] font-medium leading-6">Hello Name</span>
          <span className="text-[#212121] text-[24px] font-bold leading-9">Welcome Back</span>
        </div>
      </div>
    </div>
  )
}

export default StaffHeader
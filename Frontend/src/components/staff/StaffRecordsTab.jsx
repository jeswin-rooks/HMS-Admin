import React from 'react'
import { Search, ChevronDown, Eye, Pencil } from 'lucide-react'
import doctorImg from '../assets/doctor.jpg'

const StaffRecordsTab = ({ staffData }) => {
  return (
    <div className="flex flex-col gap-5">
      
      {/* Filtering and Search toolbar */}
      <div className="bg-white rounded-xl p-5 flex justify-between items-center shadow-[0px_4px_10px_rgba(0,0,0,0.03)] border border-[#E9E9E9]">
        
        <div className="flex items-center gap-2.5 w-85 h-12 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg px-4">
          <Search size={20} className="text-[#9CA3AF]" />
          <input 
            type="text" 
            placeholder="Enter Doctor Name etc.." 
            className="bg-transparent border-none outline-none text-[14px] text-[#4B5563] w-full"
          />
        </div>

        <div className="flex items-center gap-5">
          <div className="flex flex-col gap-1">
            <span className="text-[12px] font-medium text-[#666666]">Date</span>
            <div className="flex items-center justify-between w-35 h-11 px-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg cursor-pointer">
              <span className="text-[14px] text-[#212121]">Today</span>
              <ChevronDown size={16} className="text-[#666666]" />
            </div>
          </div>
          
          <div className="flex flex-col gap-1">
            <span className="text-[12px] font-medium text-[#666666]">Status</span>
            <div className="flex items-center justify-between w-35 h-11 px-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg cursor-pointer">
              <span className="text-[14px] text-[#212121]">Active</span>
              <ChevronDown size={16} className="text-[#666666]" />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[12px] font-medium text-[#666666]">Attendance</span>
            <div className="flex items-center justify-between w-35 h-11 px-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg cursor-pointer">
              <span className="text-[14px] text-[#212121]">Present</span>
              <ChevronDown size={16} className="text-[#666666]" />
            </div>
          </div>
        </div>

      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-xl shadow-[0px_4px_10px_rgba(0,0,0,0.03)] border border-[#E9E9E9]">
        
        <div className="flex px-5 border-b border-[#E5E7EB]">
          {['Doctors (12)', 'Therapist', 'Receptionists', 'Pharmacy Staff', 'Cleaning and Security Staff'].map((tab, i) => (
            <div 
              key={i}
              className={`py-4 px-3 cursor-pointer border-b-2 font-medium text-[14px] leading-5 ${i === 0 ? 'border-[#212121] text-[#212121]' : 'border-transparent text-[#666666]'}`}
            >
              {tab}
            </div>
          ))}
        </div>

        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="border-b border-[#E5E7EB] text-[12px] font-medium text-[#666666] bg-[#FAFAFA]">
                <th className="py-4 px-5 w-[250px]">Doctor Name</th>
                <th className="py-4 px-5">Role/Dept</th>
                <th className="py-4 px-5">Attendance</th>
                <th className="py-4 px-5">Consultation Fee</th>
                <th className="py-4 px-5">Salary</th>
                <th className="py-4 px-5">Status</th>
                <th className="py-4 px-5">Action</th>
              </tr>
            </thead>
            <tbody>
              {staffData.map((item, idx) => (
                <tr key={item.id} className={`border-b border-[#E5E7EB] hover:bg-gray-50 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-[#FAFAFA]'}`}>
                  <td className="py-4 px-5 whitespace-nowrap flex items-center gap-3">
                    <img 
                      src={doctorImg} 
                      alt="avatar" 
                      className="w-10 h-10 rounded-full object-cover" 
                    />
                    <div className="flex flex-col">
                      <span className="text-[12px] text-[#212121] font-medium">{item.name}</span>
                      <span className="text-[10px] text-[#666666]">ID: {item.pid}</span>
                    </div>
                  </td>
                  <td className="py-4 px-5 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="text-[12px] text-[#212121] font-medium">{item.role}</span>
                      <span className="text-[10px] text-[#666666]">{item.dept}</span>
                    </div>
                  </td>
                  <td className="py-4 px-5 whitespace-nowrap">
                    <div className={`px-3 py-1 rounded-full inline-flex items-center justify-center text-[12px] font-medium 
                      ${item.attendance === 'Present' ? 'bg-[#D8F5E5] text-[#34A853]' : 'bg-[#FEE2E2] text-[#EF4444]'}`}>
                      {item.attendance}
                    </div>
                  </td>
                  <td className="py-4 px-5 text-[12px] text-[#212121] font-medium whitespace-nowrap">
                    {item.fee}
                  </td>
                  <td className="py-4 px-5 text-[12px] text-[#212121] font-medium whitespace-nowrap">
                    {item.salary}
                  </td>
                  <td className="py-4 px-5 text-[12px] whitespace-nowrap">
                    <span className={item.status === 'Active' ? 'text-[#34A853]' : 'text-[#EF4444]'}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-4 px-5 whitespace-nowrap">
                    <div className="flex items-center gap-3 text-[#3B82F6] cursor-pointer">
                      <Eye size={18} />
                      <Pencil size={18} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="py-4 px-5 flex items-center justify-center bg-[#F9FAFB] rounded-b-xl border-t border-[#E5E7EB]">
          <div className="flex gap-2">
            <button className="w-8 h-8 rounded-full bg-white border border-[#E5E7EB] flex items-center justify-center text-[#666666] text-[12px] shadow-sm cursor-pointer hover:bg-gray-50">|&lt;</button>
            <button className="w-8 h-8 rounded-full bg-white border border-[#E5E7EB] flex items-center justify-center text-[#666666] text-[12px] shadow-sm cursor-pointer hover:bg-gray-50">&lt;</button>
            {[1,2,3,4,5,6,7].map(num => (
              <button 
                key={num}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] shadow-sm cursor-pointer ${num === 1 ? 'bg-[#D6F1E6] border border-[#235347] text-[#235347] font-medium' : 'bg-[#E5E7EB] text-[#212121]'}`}
              >
                {num}
              </button>
            ))}
            <button className="w-8 h-8 rounded-full bg-white border border-[#E5E7EB] flex items-center justify-center text-[#666666] text-[12px] shadow-sm cursor-pointer hover:bg-gray-50">&gt;</button>
            <button className="w-8 h-8 rounded-full bg-white border border-[#E5E7EB] flex items-center justify-center text-[#666666] text-[12px] shadow-sm cursor-pointer hover:bg-gray-50">&gt;|</button>
          </div>
        </div>

      </div>

    </div>
  )
}

export default StaffRecordsTab
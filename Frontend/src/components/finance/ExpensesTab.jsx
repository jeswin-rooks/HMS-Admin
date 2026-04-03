import React from 'react'
import { Search, ChevronDown, Pencil } from 'lucide-react'

const ExpensesTab = ({ activeSubTab, onSubTabChange, expensesData }) => {
  return (
    <div className="flex flex-col gap-[20px]">
      
      {/* Filtering and Search toolbar */}
      <div className="bg-white rounded-[12px] p-[20px] flex justify-between items-center shadow-[0px_4px_10px_rgba(0,0,0,0.03)] border border-[#E9E9E9]">
        
        <div className="flex items-center gap-[10px] w-[340px] h-[48px] bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg px-[16px]">
          <Search size={20} className="text-[#9CA3AF]" />
          <input 
            type="text" 
            placeholder="Enter Doctor Name etc.." 
            className="bg-transparent border-none outline-none text-[14px] text-[#4B5563] w-full"
          />
        </div>

        <div className="flex items-center gap-[20px]">
          <div className="flex flex-col gap-[4px]">
            <span className="text-[12px] font-medium text-[#666666]">Date</span>
            <div className="flex items-center justify-between w-[140px] h-[44px] px-[16px] bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg cursor-pointer">
              <span className="text-[14px] text-[#212121]">Today</span>
              <ChevronDown size={16} className="text-[#666666]" />
            </div>
          </div>
          
          <div className="flex flex-col gap-[4px]">
            <span className="text-[12px] font-medium text-[#666666]">Sub Category</span>
            <div className="flex items-center justify-between w-[140px] h-[44px] px-[16px] bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg cursor-pointer">
              <span className="text-[14px] text-[#212121]">Medicine</span>
              <ChevronDown size={16} className="text-[#666666]" />
            </div>
          </div>

          <div className="flex flex-col gap-[4px]">
            <span className="text-[12px] font-medium text-[#666666]">Payment Method</span>
            <div className="flex items-center justify-between w-[120px] h-[44px] px-[16px] bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg cursor-pointer">
              <span className="text-[14px] text-[#212121]">Card</span>
              <ChevronDown size={16} className="text-[#666666]" />
            </div>
          </div>

          <div className="flex flex-col gap-[4px] justify-end h-[68px]">
            <button className="h-[44px] px-[20px] bg-[#051F20] text-white rounded-lg text-[14px] font-medium">
              Add Expenses
            </button>
          </div>
        </div>

      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-[12px] shadow-[0px_4px_10px_rgba(0,0,0,0.03)] border border-[#E9E9E9]">
        
        <div className="flex px-[20px] border-b border-[#E5E7EB]">
          {['Utilities (12)', 'Maintenance', 'Salary', 'Security', 'Miscellaneous'].map((tab, i) => (
            <div 
              key={i}
              className={`py-[16px] px-[12px] cursor-pointer border-b-2 font-medium text-[14px] leading-[20px] ${i === 0 ? 'border-[#212121] text-[#212121]' : 'border-transparent text-[#666666]'}`}
            >
              {tab}
            </div>
          ))}
        </div>

        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="border-b border-[#E5E7EB] text-[12px] font-medium text-[#666666]">
                <th className="py-[16px] px-[20px]">Date</th>
                <th className="py-[16px] px-[20px]">Sub Category</th>
                <th className="py-[16px] px-[20px]">Invoice ID</th>
                <th className="py-[16px] px-[20px]">Paid By</th>
                <th className="py-[16px] px-[20px]">Payment Method</th>
                <th className="py-[16px] px-[20px]">Total Bill</th>
                <th className="py-[16px] px-[20px]">Action</th>
              </tr>
            </thead>
            <tbody>
              {expensesData.map((item, idx) => (
                <tr key={item.id} className={`border-b border-[#E5E7EB] hover:bg-gray-50 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-[#FAFAFA]'}`}>
                  <td className="py-[16px] px-[20px] text-[12px] text-[#212121] whitespace-nowrap">
                    {item.date}
                  </td>
                  <td className="py-[16px] px-[20px] text-[12px] text-[#212121] font-medium whitespace-nowrap">
                    {item.subCategory}
                  </td>
                  <td className="py-[16px] px-[20px] text-[12px] text-[#212121] whitespace-nowrap">
                    {item.invoiceId}
                  </td>
                  <td className="py-[16px] px-[20px] whitespace-nowrap flex flex-col">
                    <span className="text-[12px] text-[#212121] font-medium">{item.paidBy}</span>
                    <span className="text-[10px] text-[#666666]">PID: {item.pid}</span>
                  </td>
                  <td className="py-[16px] px-[20px] whitespace-nowrap">
                    <div className={`px-[12px] py-[4px] rounded-full inline-flex items-center justify-center gap-[4px] text-[12px] font-medium 
                      ${item.paymentMethod === 'Card' ? 'bg-[#E1EFFF] text-[#416BFF]' : 
                        item.paymentMethod === 'UPI' ? 'bg-[#EBE2FF] text-[#9D4DFF]' : 
                        'bg-[#D8F5E5] text-[#34A853]'}`}>
                      {item.paymentMethod === 'Card' && <div className="w-[12px] h-[8px] bg-[#416BFF] rounded-sm"></div>}
                      {item.paymentMethod === 'UPI' && <div className="w-[12px] h-[12px] rounded-full border-2 border-[#9D4DFF] flex items-center justify-center"><div className="w-[4px] h-[4px] bg-[#9D4DFF] rounded-full"></div></div>}
                      {item.paymentMethod === 'Cash' && <span className="text-[14px]">₹</span>}
                      <span className="ml-[4px]">{item.paymentMethod}</span>
                    </div>
                  </td>
                  <td className="py-[16px] px-[20px] text-[12px] text-[#212121] font-medium whitespace-nowrap">
                    {item.totalBill}
                  </td>
                  <td className="py-[16px] px-[20px] whitespace-nowrap">
                    <Pencil size={18} className="text-[#3b82f6] cursor-pointer" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="py-[16px] px-[20px] flex items-center justify-center bg-[#F9FAFB] rounded-b-[12px]">
          <div className="flex gap-[8px]">
            <button className="w-[32px] h-[32px] rounded-full bg-white border border-[#E5E7EB] flex items-center justify-center text-[#666666] text-[12px] shadow-sm cursor-pointer hover:bg-gray-50">|&lt;</button>
            <button className="w-[32px] h-[32px] rounded-full bg-white border border-[#E5E7EB] flex items-center justify-center text-[#666666] text-[12px] shadow-sm cursor-pointer hover:bg-gray-50">&lt;</button>
            {[1,2,3,4,5,6,7].map(num => (
              <button 
                key={num}
                className={`w-[32px] h-[32px] rounded-full flex items-center justify-center text-[12px] shadow-sm cursor-pointer ${num === 1 ? 'bg-[#D6F1E6] border border-[#235347] text-[#235347] font-medium' : 'bg-[#E5E7EB] text-[#212121]'}`}
              >
                {num}
              </button>
            ))}
            <button className="w-[32px] h-[32px] rounded-full bg-white border border-[#E5E7EB] flex items-center justify-center text-[#666666] text-[12px] shadow-sm cursor-pointer hover:bg-gray-50">&gt;</button>
            <button className="w-[32px] h-[32px] rounded-full bg-white border border-[#E5E7EB] flex items-center justify-center text-[#666666] text-[12px] shadow-sm cursor-pointer hover:bg-gray-50">&gt;|</button>
          </div>
        </div>

      </div>

    </div>
  )
}

export default ExpensesTab
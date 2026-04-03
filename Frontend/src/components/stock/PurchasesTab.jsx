import React from 'react'
import { Search, ChevronDown, Pencil, CreditCard, Smartphone, Banknote } from 'lucide-react'

const PurchasesTab = ({ purchasesData }) => {
  return (
    <div className="w-full flex flex-col gap-[20px]">
      
      {/* Purchases Toolbar */}
      <div className="bg-white rounded-[16px] border border-[rgba(130,143,143,0.25)] p-[24px] flex justify-between items-end shadow-sm">
        <div className="w-[300px] h-[48px] bg-[#F3F6F9] rounded-[8px] border border-[#E5E7EB] flex items-center px-[16px] gap-[10px]">
          <Search size={18} className="text-[#666666]" />
          <input 
            type="text" 
            placeholder="Enter Doctor Name etc..."
            className="bg-transparent border-none outline-none text-[14px] text-[#212121] placeholder-[#666666] w-full"
          />
        </div>

        <div className="flex gap-[16px]">
          <div className="flex flex-col gap-[8px]">
            <label className="text-[#666666] text-[12px] font-medium">Date</label>
            <div className="h-[44px] bg-[#F3F6F9] rounded-[8px] border border-[#E5E7EB] flex items-center px-[16px] w-[140px] justify-between cursor-pointer">
              <span className="text-[#212121] text-[14px]">Today</span>
              <ChevronDown size={18} className="text-[#666666]" />
            </div>
          </div>
          <div className="flex flex-col gap-[8px]">
            <label className="text-[#666666] text-[12px] font-medium">Category</label>
            <div className="h-[44px] bg-[#F3F6F9] rounded-[8px] border border-[#E5E7EB] flex items-center px-[16px] w-[160px] justify-between cursor-pointer">
              <span className="text-[#212121] text-[14px]">Medicine</span>
              <ChevronDown size={18} className="text-[#666666]" />
            </div>
          </div>
          <div className="flex flex-col gap-[8px]">
            <label className="text-[#666666] text-[12px] font-medium">Payment Method</label>
            <div className="h-[44px] bg-[#F3F6F9] rounded-[8px] border border-[#E5E7EB] flex items-center px-[16px] w-[160px] justify-between cursor-pointer">
              <span className="text-[#212121] text-[14px]">Card</span>
              <ChevronDown size={18} className="text-[#666666]" />
            </div>
          </div>
        </div>
      </div>

      {/* Purchases Table */}
      <div className="bg-white rounded-[16px] border border-[rgba(130,143,143,0.25)] flex flex-col shadow-sm overflow-hidden">
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1200px]">
            <thead>
              <tr className="border-b border-[#E5E7EB] bg-[#FAFAFA]">
                <th className="py-[16px] px-[24px] text-[13px] font-medium text-[#666666]">Date</th>
                <th className="py-[16px] px-[24px] text-[13px] font-medium text-[#666666]">Invoice ID</th>
                <th className="py-[16px] px-[24px] text-[13px] font-medium text-[#666666]">Paid By</th>
                <th className="py-[16px] px-[24px] text-[13px] font-medium text-[#666666]">Payment Method</th>
                <th className="py-[16px] px-[24px] text-[13px] font-medium text-[#666666]">Category</th>
                <th className="py-[16px] px-[24px] text-[13px] font-medium text-[#666666]">Name</th>
                <th className="py-[16px] px-[24px] text-[13px] font-medium text-[#666666]">Quantity</th>
                <th className="py-[16px] px-[24px] text-[13px] font-medium text-[#666666]">Unit Price</th>
                <th className="py-[16px] px-[24px] text-[13px] font-medium text-[#666666]">Total Bill</th>
                <th className="py-[16px] px-[24px] text-[13px] font-medium text-[#666666]">Action</th>
              </tr>
            </thead>
            <tbody>
              {purchasesData.map((row, i) => (
                <tr key={i} className="border-b border-[#E5E7EB] hover:bg-[#Fcfcfc] transition-colors bg-white">
                  <td className="py-[16px] px-[24px] text-[14px] text-[#212121]">{row.date}</td>
                  <td className="py-[16px] px-[24px] text-[14px] text-[#212121] font-semibold">{row.invoice}</td>
                  <td className="py-[16px] px-[24px]">
                    {row.paidByName ? (
                      <div className="flex flex-col">
                        <span className="text-[14px] font-medium text-[#212121]">{row.paidByName}</span>
                        <span className="text-[12px] text-[#666666]">{row.paidByPid}</span>
                      </div>
                    ) : null}
                  </td>
                  <td className="py-[16px] px-[24px]">
                    {row.method === 'Card' && (
                      <div className="flex items-center justify-center gap-2 bg-[#E0F2FE] text-[#2563EB] text-[12px] font-medium w-[80px] h-[28px] rounded-[16px]">
                        <CreditCard size={14} /> Card
                      </div>
                    )}
                    {row.method === 'UPI' && (
                      <div className="flex items-center justify-center gap-2 bg-[#F3E8FF] text-[#9333EA] text-[12px] font-medium w-[80px] h-[28px] rounded-[16px]">
                        <Smartphone size={14} /> UPI
                      </div>
                    )}
                    {row.method === 'Cash' && (
                      <div className="flex items-center justify-center gap-2 bg-[#DCFCE7] text-[#16A34A] text-[12px] font-medium w-[80px] h-[28px] rounded-[16px]">
                        <Banknote size={14} /> Cash
                      </div>
                    )}
                  </td>
                  <td className="py-[16px] px-[24px] text-[14px] text-[#212121] font-medium">{row.category}</td>
                  <td className="py-[16px] px-[24px] text-[14px] text-[#212121]">{row.name}</td>
                  <td className="py-[16px] px-[24px] text-[14px] text-[#212121] font-medium">{row.qty}</td>
                  <td className="py-[16px] px-[24px] text-[14px] text-[#212121]">{row.price}</td>
                  <td className="py-[16px] px-[24px] text-[14px] text-[#212121]">{row.total}</td>
                  <td className="py-[16px] px-[24px]">
                    <button className="text-[#2563EB] hover:text-blue-700 transition-colors">
                      <Pencil size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="py-[20px] bg-[#FAFAFA] flex justify-center border-t border-[rgba(130,143,143,0.25)]">
          <div className="flex gap-[8px] items-center">
            <button className="w-[32px] h-[32px] rounded-full bg-white border border-[#E5E7EB] flex items-center justify-center text-[#666666] text-[12px] shadow-sm cursor-pointer hover:bg-gray-50">|&lt;</button>
            <button className="w-[32px] h-[32px] rounded-full bg-white border border-[#E5E7EB] flex items-center justify-center text-[#666666] text-[12px] shadow-sm cursor-pointer hover:bg-gray-50">&lt;</button>
            
            <button className="w-[32px] h-[32px] rounded-full bg-[#E0E8E5] border border-[#235347] flex items-center justify-center text-[#212121] text-[13px] font-medium">1</button>
            {[2,3,4,5,6,7].map(num => (
              <button key={num} className="w-[32px] h-[32px] rounded-full bg-[#E5E7EB] border border-transparent flex items-center justify-center text-[#666666] text-[13px] font-medium hover:bg-gray-300 cursor-pointer">
                {num}
              </button>
            ))}
            
            <button className="w-[32px] h-[32px] rounded-full bg-white border border-[#E5E7EB] flex items-center justify-center text-[#666666] text-[12px] shadow-sm cursor-pointer hover:bg-gray-50">&gt;</button>
            <button className="w-[32px] h-[32px] rounded-full bg-white border border-[#E5E7EB] flex items-center justify-center text-[#666666] text-[12px] shadow-sm cursor-pointer hover:bg-gray-50">&gt;|</button>
          </div>
        </div>

      </div>
    </div>
  ) // ...existing code...
}

export default PurchasesTab

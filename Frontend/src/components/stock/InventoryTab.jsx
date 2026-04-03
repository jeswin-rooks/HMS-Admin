import React from 'react'
import { Search, ChevronDown } from 'lucide-react'

const InventoryTab = ({ activeSubTab, onSubTabChange, inventoryData }) => {
  return (
    <div className="w-full bg-[#f8fafc] rounded-2xl border border-[rgba(130,143,143,0.25)] flex flex-col shadow-sm">
      
      {/* Toolbar */}
      <div className="w-full p-6 flex justify-between items-end border-b border-[rgba(130,143,143,0.25)] bg-white rounded-t-[16px]">
        <div className="w-[300px] h-[48px] bg-[#F3F6F9] rounded-[8px] border border-[#E5E7EB] flex items-center px-[16px] gap-[10px]">
          <Search size={18} className="text-[#666666]" />
          <input 
            type="text" 
            placeholder="Enter Doctor Name etc..."
            className="bg-transparent border-none outline-none text-[14px] text-[#212121] placeholder-[#666666] w-full"
          />
        </div>

        <div className="flex flex-col gap-[8px]">
          <label className="text-[#666666] text-[12px] font-medium">Category</label>
          <div className="h-[44px] bg-[#F3F6F9] rounded-[8px] border border-[#E5E7EB] flex items-center px-[16px] w-[180px] justify-between cursor-pointer">
            <span className="text-[#212121] text-[14px]">Medicine</span>
            <ChevronDown size={18} className="text-[#666666]" />
          </div>
        </div>
      </div>

      {/* Sub tabs & Table */}
      <div className="flex flex-col bg-[#Fcfcfc]">
        
        <div className="flex gap-[30px] px-[24px] border-b border-[rgba(130,143,143,0.25)] h-[48px] items-center">
          <span 
            onClick={() => onSubTabChange('available')}
            className={`text-[14px] font-medium cursor-pointer h-full flex items-center border-b-2 ${activeSubTab === 'available' ? 'text-[#212121] border-[#212121]' : 'text-[#666666] border-transparent'}`}
          >
            Available (12)
          </span>
          <span 
            onClick={() => onSubTabChange('low_stock')}
            className={`text-[14px] font-medium cursor-pointer h-full flex items-center border-b-2 ${activeSubTab === 'low_stock' ? 'text-[#212121] border-[#212121]' : 'text-[#666666] border-transparent'}`}
          >
            Low Stock
          </span>
          <span 
            onClick={() => onSubTabChange('out_of_stock')}
            className={`text-[14px] font-medium cursor-pointer h-full flex items-center border-b-2 ${activeSubTab === 'out_of_stock' ? 'text-[#212121] border-[#212121]' : 'text-[#666666] border-transparent'}`}
          >
            Out Of Stock
          </span>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="border-b border-[rgba(130,143,143,0.25)] bg-[#F5F7FA]">
                <th className="py-[16px] px-[24px] text-[13px] font-medium text-[#666666]">Name</th>
                <th className="py-[16px] px-[24px] text-[13px] font-medium text-[#666666]">Category</th>
                <th className="py-[16px] px-[24px] text-[13px] font-medium text-[#666666]">Stock</th>
                <th className="py-[16px] px-[24px] text-[13px] font-medium text-[#666666]">Batches</th>
                <th className="py-[16px] px-[24px] text-[13px] font-medium text-[#666666]">Purchase Date</th>
              </tr>
            </thead>
            <tbody>
              {inventoryData.map((row, i) => (
                <tr key={i} className={`border-b border-[#E5E7EB] hover:bg-white transition-colors ${i % 2 === 0 ? 'bg-[#FAFAFA]' : 'bg-white'}`}>
                  <td className="py-[16px] px-[24px] text-[14px] text-[#212121]">{row.name}</td>
                  <td className="py-[16px] px-[24px] text-[14px] text-[#212121]">{row.category}</td>
                  <td className="py-[16px] px-[24px] text-[14px] text-[#212121]">{row.stock}</td>
                  <td className="py-[16px] px-[24px] text-[14px] text-[#212121] font-medium">{row.batch}</td>
                  <td className="py-[16px] px-[24px] text-[14px] text-[#212121]">{row.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="py-[20px] bg-white flex justify-end px-[24px] border-t border-[rgba(130,143,143,0.25)] rounded-b-[16px]">
          <div className="flex gap-[8px] items-center">
            <button className="w-[32px] h-[32px] rounded-full bg-white border border-[#E5E7EB] flex items-center justify-center text-[#666666] text-[12px] shadow-sm cursor-pointer hover:bg-gray-50">|&lt;</button>
            <button className="w-[32px] h-[32px] rounded-full bg-white border border-[#E5E7EB] flex items-center justify-center text-[#666666] text-[12px] shadow-sm cursor-pointer hover:bg-gray-50">&lt;</button>
            
            <button className="w-[32px] h-[32px] rounded-full bg-[#E0E8E5] border border-[#235347] flex items-center justify-center text-[#212121] text-[13px] font-medium">1</button>
            {[2,3,4,5,6,7].map(num => (
              <button key={num} className="w-[32px] h-[32px] rounded-full bg-[#FAFAFA] border border-[#E5E7EB] flex items-center justify-center text-[#666666] text-[13px] font-medium hover:bg-gray-100 cursor-pointer">
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

export default InventoryTab

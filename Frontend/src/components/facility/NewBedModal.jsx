import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useData } from '../../context/DataContext';

const NewBedModal = ({ isOpen, onClose }) => {
  const { data, addBed } = useData();
  const [bedId, setBedId] = useState('');
  const [roomNo, setRoomNo] = useState('');
  const [department, setDepartment] = useState('');

  if (!isOpen) return null;

  const handleSave = () => {
    if (!bedId || !roomNo || !department) return; // basic validation
    
    addBed({
      id: bedId,
      roomNo,
      department,
      dischargeDate: '12-08-2000', // Default mock
      status: 'Available' // Default status
    });
    
    // clear fields
    setBedId('');
    setRoomNo('');
    setDepartment('');
    
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center font-['Poppins']">
      <div className="bg-[#F3F6F9] w-[658px] rounded-[12px] flex flex-col shadow-[0px_4px_8px_3px_rgba(0,0,0,0.15),_0px_1px_3px_rgba(0,0,0,0.3)] border border-[#E5E7EB] overflow-hidden relative">
        
        {/* Header */}
        <div className="flex flex-row justify-between items-center px-[24px] py-[24px] bg-white border-b border-[#E5E7EB]">
          <h2 className="font-semibold text-[24px] leading-[36px] text-[#051F20] m-0">
            New Bed
          </h2>
          <button type="button" onClick={onClose} className="bg-transparent border-none cursor-pointer flex items-center justify-center p-0 transition-opacity hover:opacity-75">
            <X className="text-[#051F20] w-[24px] h-[24px]" strokeWidth={1.5} />
          </button>
        </div>

        {/* Form Content */}
        <div className="flex flex-col p-[30px] gap-[24px]">
          
          {/* First Row: Bed ID + Room No */}
          <div className="flex flex-row gap-[24px]">
            {/* Bed ID */}
            <div className="flex flex-col gap-[8px] flex-1">
              <label className="font-normal text-[14px] text-[#666666]">
                Bed ID
              </label>
              <div className="flex flex-row items-center bg-white border border-[rgba(130,143,143,0.25)] h-[48px] rounded-[8px] px-[16px]">
                <input 
                  type="text" 
                  value={bedId}
                  onChange={(e) => setBedId(e.target.value)}
                  className="w-full text-[16px] bg-transparent border-none outline-none text-[#212121] placeholder-[#666666]"
                  placeholder="B101"
                />
              </div>
            </div>

            {/* Room No */}
            <div className="flex flex-col gap-[8px] flex-1">
              <label className="font-normal text-[14px] text-[#666666]">
                Room No
              </label>
              <div className="flex flex-row items-center bg-white border border-[rgba(130,143,143,0.25)] h-[48px] rounded-[8px] px-[16px]">
                <input 
                  type="text" 
                  value={roomNo}
                  onChange={(e) => setRoomNo(e.target.value)}
                  className="w-full text-[16px] bg-transparent border-none outline-none text-[#212121] placeholder-[#666666]"
                  placeholder="101"
                />
              </div>
            </div>
          </div>

          {/* Department */}
          <div className="flex flex-col gap-[8px]">
            <label className="font-normal text-[14px] text-[#666666]">
              Department
            </label>
            <div className="flex flex-row items-center bg-white border border-[rgba(130,143,143,0.25)] h-[48px] rounded-[8px] px-[16px]">
              <select 
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full text-[16px] bg-transparent border-none outline-none text-[#212121] appearance-none cursor-pointer"
              >
                <option value="" disabled hidden>Cardiology</option>
                {data?.departments?.map((dept, idx) => (
                  <option key={idx} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-[8px]">
            <button 
              type="button"
              onClick={handleSave}
              className="flex justify-center items-center px-[32px] py-[10px] h-[48px] bg-[#051F20] text-white rounded-[8px] text-[16px] font-medium cursor-pointer hover:bg-[#031112] shadow-sm transition-colors"
            >
              Save
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default NewBedModal;

import React from 'react'
import { X, Pencil } from 'lucide-react'
import doctorImg from '../assets/doctor.jpg'

const Badge = ({ value, positive }) => (
  <span className={`px-3 py-1 rounded-full text-[12px] font-medium ${positive ? 'bg-[#D8F5E5] text-[#34A853]' : 'bg-[#FEE2E2] text-[#EF4444]'}`}>
    {value}
  </span>
)

const Row = ({ label, value }) => (
  <div className="flex flex-col gap-1 p-3 rounded-lg border border-[#E5E7EB] bg-[#F9FAFB]">
    <span className="text-[12px] text-[#6B7280]">{label}</span>
    <span className="text-[14px] font-medium text-[#111827]">{value || '-'}</span>
  </div>
)

const StaffDetailModal = ({ staff, onClose, onEdit }) => {
  if (!staff) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div className="w-full max-w-[760px] rounded-xl bg-[#F1F2F4] shadow-2xl overflow-hidden border border-[#CBD2D9]">
        <div className="h-[44px] px-5 flex items-center justify-between bg-[#E7EAEE] border-b border-[#D5DAE0]">
          <h2 className="text-[26px] font-bold text-[#1B2E2A] leading-none">Staff Details</h2>
          <button onClick={onClose} className="text-[#5E6B72] hover:text-[#1B2E2A]">
            <X size={20} />
          </button>
        </div>

        <div className="p-5 flex gap-4 items-center border-b border-[#D5DAE0] bg-white">
          <img src={staff.photo || doctorImg} alt="staff avatar" className="w-14 h-14 rounded-full object-cover border border-[#E5E7EB]" />
          <div className="flex flex-col">
            <span className="text-[18px] font-semibold text-[#111827]">{staff.name}</span>
            <span className="text-[13px] text-[#6B7280]">{staff.pid || '#N/A'}</span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Badge value={staff.attendance} positive={staff.attendance === 'Present'} />
            <Badge value={staff.status} positive={staff.status === 'Active'} />
          </div>
        </div>

        <div className="p-5 grid grid-cols-2 gap-3">
          <Row label="Role" value={staff.role} />
          <Row label="Department" value={staff.dept} />
          <Row label="Consultation Fee" value={staff.fee} />
          <Row label="Salary" value={staff.salary} />
        </div>

        <div className="px-5 pb-4 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="h-10 min-w-[88px] rounded-lg border border-[#D7DBE0] bg-white text-[#1F2937] text-[14px] font-medium hover:bg-[#F8FAFC] transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => onEdit(staff)}
            className="h-10 min-w-[120px] rounded-lg bg-[#052B2C] text-white text-[14px] font-medium hover:bg-[#07383A] transition-colors inline-flex items-center justify-center gap-2"
          >
            <Pencil size={14} /> Edit Staff
          </button>
        </div>
      </div>
    </div>
  )
}

export default StaffDetailModal

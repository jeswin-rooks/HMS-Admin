import React, { useMemo, useState } from 'react'
import { X } from 'lucide-react'

const attendanceOptions = ['Present', 'Absent']
const statusOptions = ['Active', 'Inactive']

const StaffFormModal = ({ initialData, onClose, onSave }) => {
  const isEdit = Boolean(initialData)

  const [form, setForm] = useState({
    name: initialData?.name || '',
    pid: initialData?.pid || '',
    role: initialData?.role || '',
    dept: initialData?.dept || '',
    attendance: initialData?.attendance || 'Present',
    fee: initialData?.fee || '500',
    salary: initialData?.salary || '',
    status: initialData?.status || 'Active'
  })

  const title = useMemo(() => (isEdit ? 'Edit Staff' : 'Add Staff'), [isEdit])

  const setField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    if (!form.name.trim() || !form.role.trim() || !form.dept.trim()) {
      return
    }

    onSave({
      ...initialData,
      name: form.name.trim(),
      pid: form.pid.trim(),
      role: form.role.trim(),
      dept: form.dept.trim(),
      attendance: form.attendance,
      fee: form.fee.trim() || '500',
      salary: form.salary.trim() || '0',
      status: form.status
    })
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div className="w-full max-w-[760px] rounded-xl bg-[#F1F2F4] shadow-2xl overflow-hidden border border-[#CBD2D9]">
        <div className="h-[44px] px-5 flex items-center justify-between bg-[#E7EAEE] border-b border-[#D5DAE0]">
          <h2 className="text-[26px] font-bold text-[#1B2E2A] leading-none">{title}</h2>
          <button onClick={onClose} className="text-[#5E6B72] hover:text-[#1B2E2A]">
            <X size={20} />
          </button>
        </div>

        <div className="p-5 grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-[12px] text-[#6B7280]">Staff Name</label>
            <input
              value={form.name}
              onChange={(e) => setField('name', e.target.value)}
              className="h-10 rounded-md border border-[#D7DBE0] bg-[#F7F8FA] px-3 text-[14px]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[12px] text-[#6B7280]">Staff ID</label>
            <input
              value={form.pid}
              onChange={(e) => setField('pid', e.target.value)}
              placeholder="#DOC-011"
              className="h-10 rounded-md border border-[#D7DBE0] bg-[#F7F8FA] px-3 text-[14px]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[12px] text-[#6B7280]">Role</label>
            <input
              value={form.role}
              onChange={(e) => setField('role', e.target.value)}
              className="h-10 rounded-md border border-[#D7DBE0] bg-[#F7F8FA] px-3 text-[14px]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[12px] text-[#6B7280]">Department</label>
            <input
              value={form.dept}
              onChange={(e) => setField('dept', e.target.value)}
              className="h-10 rounded-md border border-[#D7DBE0] bg-[#F7F8FA] px-3 text-[14px]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[12px] text-[#6B7280]">Attendance</label>
            <select
              value={form.attendance}
              onChange={(e) => setField('attendance', e.target.value)}
              className="h-10 rounded-md border border-[#D7DBE0] bg-[#F7F8FA] px-3 text-[14px]"
            >
              {attendanceOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[12px] text-[#6B7280]">Status</label>
            <select
              value={form.status}
              onChange={(e) => setField('status', e.target.value)}
              className="h-10 rounded-md border border-[#D7DBE0] bg-[#F7F8FA] px-3 text-[14px]"
            >
              {statusOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[12px] text-[#6B7280]">Consultation Fee</label>
            <input
              value={form.fee}
              onChange={(e) => setField('fee', e.target.value)}
              placeholder="500"
              className="h-10 rounded-md border border-[#D7DBE0] bg-[#F7F8FA] px-3 text-[14px]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[12px] text-[#6B7280]">Salary</label>
            <input
              value={form.salary}
              onChange={(e) => setField('salary', e.target.value)}
              placeholder="12500"
              className="h-10 rounded-md border border-[#D7DBE0] bg-[#F7F8FA] px-3 text-[14px]"
            />
          </div>
        </div>

        <div className="px-5 pb-4 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="h-10 min-w-[88px] rounded-lg border border-[#D7DBE0] bg-white text-[#1F2937] text-[14px] font-medium hover:bg-[#F8FAFC] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="h-10 min-w-[88px] rounded-lg bg-[#052B2C] text-white text-[14px] font-medium hover:bg-[#07383A] transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default StaffFormModal

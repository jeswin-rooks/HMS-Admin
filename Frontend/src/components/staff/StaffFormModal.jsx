import React, { useMemo, useState } from 'react'
import { Camera, X } from 'lucide-react'

const attendanceOptions = ['Present', 'Absent']
const statusOptions = ['Active', 'Inactive']
const genderOptions = ['Male', 'Female', 'Other']
const categoryOptions = ['Doctors', 'Therapist', 'Receptionists', 'Pharmacy Staff', 'Cleaning and Security Staff']

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
    status: initialData?.status || 'Active',
    category: initialData?.category || '',
    gender: initialData?.gender || 'Male',
    dob: initialData?.dob || '',
    aadharNo: initialData?.aadharNo || '',
    contactNo: initialData?.contactNo || '',
    address: initialData?.address || '',
    photo: initialData?.photo || ''
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
      status: form.status,
      category: form.category,
      gender: form.gender,
      dob: form.dob,
      aadharNo: form.aadharNo.trim(),
      contactNo: form.contactNo.trim(),
      address: form.address.trim(),
      photo: form.photo
    })
  }

  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      setField('photo', String(reader.result || ''))
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div className="w-full max-w-[720px] rounded-xl bg-[#F1F2F4] shadow-2xl overflow-hidden border border-[#CBD2D9]">
        <div className="p-4 border-b border-[#D5DAE0] bg-[#F1F2F4]">
          <h2 className="text-[18px] font-bold text-[#1B2E2A]">{title}</h2>
        </div>

        <div className="p-4 border-b border-[#D5DAE0] flex items-center gap-4 bg-white">
          <label className="relative w-[72px] h-[72px] rounded-full border-2 border-dashed border-[#D1D5DB] bg-[#F7F8FA] flex flex-col items-center justify-center cursor-pointer overflow-hidden">
            {form.photo ? (
              <img src={form.photo} alt="staff" className="w-full h-full object-cover" />
            ) : (
              <>
                <Camera size={18} className="text-[#6B7280]" />
                <span className="text-[12px] text-[#6B7280] mt-1">Add Photo</span>
              </>
            )}
            <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
          </label>

          <div className="flex-1 flex items-center gap-4">
            <div className="flex-1 min-w-0">
              <input
                value={form.name}
                onChange={(e) => setField('name', e.target.value)}
                placeholder="John Doe"
                className="h-10 w-full rounded-lg border border-[#D7DBE0] bg-[#E5E7EB] px-3 text-[18px] font-semibold text-[#2B2B2B]"
              />
              <div className="mt-1 text-[13px] text-[#666666]">ID: {form.pid || '#DOC-001'}</div>
            </div>

            <select
              value={form.status}
              onChange={(e) => setField('status', e.target.value)}
              className="h-10 min-w-[110px] rounded-md border border-[#D7DBE0] bg-[#F3F4F6] px-3 text-[14px] text-[#2B2B2B]"
            >
              {statusOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>

            <button onClick={onClose} className="text-[#2B2B2B] hover:text-black">
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="p-4 bg-[#F1F2F4]">
          <div className="border border-[#D5DAE0] rounded-md p-3 grid grid-cols-2 gap-x-3 gap-y-3 bg-[#F1F2F4]">
            <div className="col-span-2 flex flex-col gap-1">
              <label className="text-[12px] text-[#6B7280]">Category</label>
              <select
                value={form.category}
                onChange={(e) => setField('category', e.target.value)}
                className="h-9 rounded-md border border-[#D7DBE0] bg-[#E5E7EB] px-3 text-[14px] text-[#2B2B2B]"
              >
                <option value="">Select Category</option>
                {categoryOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[12px] text-[#6B7280]">Role</label>
              <input
                value={form.role}
                onChange={(e) => setField('role', e.target.value)}
                className="h-9 rounded-md border border-[#D7DBE0] bg-[#E5E7EB] px-3 text-[14px] text-[#2B2B2B]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[12px] text-[#6B7280]">Department</label>
              <input
                value={form.dept}
                onChange={(e) => setField('dept', e.target.value)}
                className="h-9 rounded-md border border-[#D7DBE0] bg-[#E5E7EB] px-3 text-[14px] text-[#2B2B2B]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[12px] text-[#6B7280]">Gender</label>
              <select
                value={form.gender}
                onChange={(e) => setField('gender', e.target.value)}
                className="h-9 rounded-md border border-[#D7DBE0] bg-[#E5E7EB] px-3 text-[14px] text-[#2B2B2B]"
              >
                {genderOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[12px] text-[#6B7280]">Date Of Birth</label>
              <input
                value={form.dob}
                onChange={(e) => setField('dob', e.target.value)}
                placeholder="12-03-1999"
                className="h-9 rounded-md border border-[#D7DBE0] bg-[#E5E7EB] px-3 text-[14px] text-[#2B2B2B]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[12px] text-[#6B7280]">Aadhar No</label>
              <input
                value={form.aadharNo}
                onChange={(e) => setField('aadharNo', e.target.value)}
                placeholder="1234 5678 9011"
                className="h-9 rounded-md border border-[#D7DBE0] bg-[#E5E7EB] px-3 text-[14px] text-[#2B2B2B]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[12px] text-[#6B7280]">Contact No</label>
              <input
                value={form.contactNo}
                onChange={(e) => setField('contactNo', e.target.value)}
                placeholder="12345 67890"
                className="h-9 rounded-md border border-[#D7DBE0] bg-[#E5E7EB] px-3 text-[14px] text-[#2B2B2B]"
              />
            </div>

            <div className="col-span-2 flex flex-col gap-1">
              <label className="text-[12px] text-[#6B7280]">Salary</label>
              <input
                value={form.salary}
                onChange={(e) => setField('salary', e.target.value)}
                placeholder="₹20,000"
                className="h-9 rounded-md border border-[#D7DBE0] bg-[#E5E7EB] px-3 text-[14px] text-[#2B2B2B]"
              />
            </div>

            <div className="col-span-2 flex flex-col gap-1">
              <label className="text-[12px] text-[#6B7280]">Address</label>
              <input
                value={form.address}
                onChange={(e) => setField('address', e.target.value)}
                placeholder="12/5 xyz Street, Nagercoil"
                className="h-10 rounded-md border border-[#D7DBE0] bg-[#E5E7EB] px-3 text-[16px] text-[#2B2B2B]"
              />
            </div>

            <div className="col-span-2 hidden">
              <input
                value={form.fee}
                onChange={(e) => setField('fee', e.target.value)}
              />
              <select
                value={form.attendance}
                onChange={(e) => setField('attendance', e.target.value)}
              >
                {attendanceOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              <input
                value={form.pid}
                onChange={(e) => setField('pid', e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="px-4 pb-4">
          <button
            onClick={handleSave}
            className="h-9 min-w-[84px] rounded-lg bg-[#052B2C] text-white text-[14px] font-medium hover:bg-[#07383A] transition-colors ml-auto block"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default StaffFormModal

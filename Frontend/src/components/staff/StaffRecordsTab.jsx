import React, { useMemo, useState } from 'react'
import { Search, ChevronDown, Eye, Pencil } from 'lucide-react'
import doctorImg from '../assets/doctor.jpg'

const StaffRecordsTab = ({ staffData, onEditStaff, onViewStaff }) => {
  const [activeStaffTab, setActiveStaffTab] = useState('doctors')
  const [searchQuery, setSearchQuery] = useState('')
  const [departmentFilter, setDepartmentFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [attendanceFilter, setAttendanceFilter] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const ROWS_PER_PAGE = 6

  const staffTabs = useMemo(() => ([
    { key: 'doctors', label: 'Doctors' },
    { key: 'therapist', label: 'Therapist' },
    { key: 'receptionists', label: 'Receptionists' },
    { key: 'pharmacy', label: 'Pharmacy Staff' },
    { key: 'cleaning', label: 'Cleaning and Security Staff' }
  ]), [])

  const isDoctorRow = (item) => {
    const role = (item.role || '').toLowerCase()
    const id = (item.pid || '').toLowerCase()
    return role.includes('doctor') || id.includes('#doc')
  }

  const baseRows = useMemo(() => {
    if (activeStaffTab === 'doctors') {
      return staffData.filter(isDoctorRow)
    }
    const nonDoctorRows = staffData.filter((item) => !isDoctorRow(item))
    return nonDoctorRows.length ? nonDoctorRows : staffData
  }, [staffData, activeStaffTab])

  const departmentOptions = useMemo(() => [...new Set(staffData.map((item) => item.dept))], [staffData])
  const statusOptions = useMemo(() => [...new Set(staffData.map((item) => item.status))], [staffData])
  const attendanceOptions = useMemo(() => [...new Set(staffData.map((item) => item.attendance))], [staffData])

  const filteredRows = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    return baseRows.filter((item) => {
      const matchesSearch =
        q.length === 0 ||
        item.name.toLowerCase().includes(q) ||
        item.pid.toLowerCase().includes(q) ||
        item.role.toLowerCase().includes(q)

      const matchesDepartment = departmentFilter ? item.dept === departmentFilter : true
      const matchesStatus = statusFilter ? item.status === statusFilter : true
      const matchesAttendance = attendanceFilter ? item.attendance === attendanceFilter : true

      return matchesSearch && matchesDepartment && matchesStatus && matchesAttendance
    })
  }, [baseRows, searchQuery, departmentFilter, statusFilter, attendanceFilter])

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / ROWS_PER_PAGE))
  const safePage = Math.min(currentPage, totalPages)
  const pagedRows = filteredRows.slice((safePage - 1) * ROWS_PER_PAGE, safePage * ROWS_PER_PAGE)

  const goToPage = (nextPage) => {
    setCurrentPage(Math.max(1, Math.min(nextPage, totalPages)))
  }

  const handleFilterChange = (setter, value) => {
    setter(value)
    setCurrentPage(1)
  }

  const tabCounts = useMemo(() => {
    const doctors = staffData.filter(isDoctorRow).length
    const nonDoctors = staffData.filter((item) => !isDoctorRow(item)).length
    const fallbackCount = nonDoctors || staffData.length

    return {
      doctors,
      therapist: fallbackCount,
      receptionists: fallbackCount,
      pharmacy: fallbackCount,
      cleaning: fallbackCount
    }
  }, [staffData])

  const pageWindow = useMemo(() => {
    const maxButtons = 7
    const start = Math.max(1, Math.min(safePage - 3, totalPages - (maxButtons - 1)))
    const end = Math.min(totalPages, start + (maxButtons - 1))
    return Array.from({ length: end - start + 1 }, (_, i) => start + i)
  }, [safePage, totalPages])

  return (
    <div className="flex flex-col gap-5">
      
      {/* Filtering and Search toolbar */}
      <div className="bg-white rounded-xl p-5 flex justify-between items-center shadow-[0px_4px_10px_rgba(0,0,0,0.03)] border border-[#E9E9E9]">
        
        <div className="flex items-center gap-2.5 w-85 h-12 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg px-4">
          <Search size={20} className="text-[#9CA3AF]" />
          <input 
            type="text" 
            placeholder="Enter Doctor Name etc.." 
            value={searchQuery}
            onChange={(e) => handleFilterChange(setSearchQuery, e.target.value)}
            className="bg-transparent border-none outline-none text-[14px] text-[#4B5563] w-full"
          />
        </div>

        <div className="flex items-center gap-5">
          <div className="flex flex-col gap-1">
            <span className="text-[12px] font-medium text-[#666666]">Department</span>
            <div className="flex items-center justify-between w-35 h-11 px-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg cursor-pointer relative">
              <select
                className="appearance-none bg-transparent border-none outline-none text-[14px] text-[#212121] w-full"
                value={departmentFilter}
                onChange={(e) => handleFilterChange(setDepartmentFilter, e.target.value)}
              >
                <option value="">All</option>
                {departmentOptions.map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
              <ChevronDown size={16} className="text-[#666666]" />
            </div>
          </div>
          
          <div className="flex flex-col gap-1">
            <span className="text-[12px] font-medium text-[#666666]">Status</span>
            <div className="flex items-center justify-between w-35 h-11 px-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg cursor-pointer relative">
              <select
                className="appearance-none bg-transparent border-none outline-none text-[14px] text-[#212121] w-full"
                value={statusFilter}
                onChange={(e) => handleFilterChange(setStatusFilter, e.target.value)}
              >
                <option value="">All</option>
                {statusOptions.map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
              <ChevronDown size={16} className="text-[#666666]" />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[12px] font-medium text-[#666666]">Attendance</span>
            <div className="flex items-center justify-between w-35 h-11 px-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg cursor-pointer relative">
              <select
                className="appearance-none bg-transparent border-none outline-none text-[14px] text-[#212121] w-full"
                value={attendanceFilter}
                onChange={(e) => handleFilterChange(setAttendanceFilter, e.target.value)}
              >
                <option value="">All</option>
                {attendanceOptions.map((attendance) => (
                  <option key={attendance} value={attendance}>{attendance}</option>
                ))}
              </select>
              <ChevronDown size={16} className="text-[#666666]" />
            </div>
          </div>
        </div>

      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-xl shadow-[0px_4px_10px_rgba(0,0,0,0.03)] border border-[#E9E9E9]">
        
        <div className="flex px-5 border-b border-[#E5E7EB]">
          {staffTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => {
                setActiveStaffTab(tab.key)
                setCurrentPage(1)
              }}
              className={`py-4 px-3 cursor-pointer border-b-2 font-medium text-[14px] leading-5 ${activeStaffTab === tab.key ? 'border-[#212121] text-[#212121]' : 'border-transparent text-[#666666]'}`}
            >
              {tab.label} ({tabCounts[tab.key]})
            </button>
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
              {pagedRows.map((item, idx) => (
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
                      <button onClick={() => onViewStaff?.(item)}>
                        <Eye size={18} />
                      </button>
                      <button onClick={() => onEditStaff?.(item)}>
                        <Pencil size={18} />
                      </button>
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
            <button
              onClick={() => goToPage(1)}
              disabled={safePage === 1}
              className="w-8 h-8 rounded-full bg-white border border-[#E5E7EB] flex items-center justify-center text-[#666666] text-[12px] shadow-sm cursor-pointer hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >|&lt;</button>
            <button
              onClick={() => goToPage(safePage - 1)}
              disabled={safePage === 1}
              className="w-8 h-8 rounded-full bg-white border border-[#E5E7EB] flex items-center justify-center text-[#666666] text-[12px] shadow-sm cursor-pointer hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >&lt;</button>
            {pageWindow.map(num => (
              <button 
                key={num}
                onClick={() => goToPage(num)}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] shadow-sm cursor-pointer ${num === safePage ? 'bg-[#D6F1E6] border border-[#235347] text-[#235347] font-medium' : 'bg-[#E5E7EB] text-[#212121]'}`}
              >
                {num}
              </button>
            ))}
            <button
              onClick={() => goToPage(safePage + 1)}
              disabled={safePage === totalPages}
              className="w-8 h-8 rounded-full bg-white border border-[#E5E7EB] flex items-center justify-center text-[#666666] text-[12px] shadow-sm cursor-pointer hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >&gt;</button>
            <button
              onClick={() => goToPage(totalPages)}
              disabled={safePage === totalPages}
              className="w-8 h-8 rounded-full bg-white border border-[#E5E7EB] flex items-center justify-center text-[#666666] text-[12px] shadow-sm cursor-pointer hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >&gt;|</button>
          </div>
        </div>

      </div>

    </div>
  )
}

export default StaffRecordsTab
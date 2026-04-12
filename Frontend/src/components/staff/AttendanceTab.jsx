import React, { useMemo, useState } from 'react'
import { Search, ChevronDown } from 'lucide-react'

const ROWS_PER_PAGE = 7

const formatMockTime = (idx, type) => {
  const baseInHour = 8 + (idx % 2)
  const baseInMin = idx % 3 === 0 ? '45' : idx % 3 === 1 ? '30' : '15'
  const baseOutHour = 17 + (idx % 2)
  const baseOutMin = idx % 2 === 0 ? '15' : '30'

  if (type === 'in') {
    return `${String(baseInHour).padStart(2, '0')}:${baseInMin} AM`
  }

  if (type === 'hours') {
    return idx % 4 === 0 ? '8h 30m' : idx % 4 === 1 ? '9h 00m' : idx % 4 === 2 ? '8h 45m' : '8h 15m'
  }

  return `${String(baseOutHour).padStart(2, '0')}:${baseOutMin} PM`
}

const AttendanceTab = ({ staffData = [] }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [departmentFilter, setDepartmentFilter] = useState('')
  const [attendanceFilter, setAttendanceFilter] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const departmentOptions = useMemo(() => [...new Set(staffData.map((item) => item.dept))], [staffData])
  const attendanceOptions = useMemo(() => [...new Set(staffData.map((item) => item.attendance))], [staffData])

  const filteredRows = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    return staffData.filter((item) => {
      const matchesSearch =
        q.length === 0 ||
        item.name.toLowerCase().includes(q) ||
        item.pid.toLowerCase().includes(q) ||
        item.role.toLowerCase().includes(q)

      const matchesDepartment = departmentFilter ? item.dept === departmentFilter : true
      const matchesAttendance = attendanceFilter ? item.attendance === attendanceFilter : true

      return matchesSearch && matchesDepartment && matchesAttendance
    })
  }, [staffData, searchQuery, departmentFilter, attendanceFilter])

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

  const pageWindow = useMemo(() => {
    const maxButtons = 7
    const start = Math.max(1, Math.min(safePage - 3, totalPages - (maxButtons - 1)))
    const end = Math.min(totalPages, start + (maxButtons - 1))
    return Array.from({ length: end - start + 1 }, (_, i) => start + i)
  }, [safePage, totalPages])

  return (
    <div className="flex flex-col gap-5">
      <div className="bg-white rounded-xl p-5 flex justify-between items-center shadow-[0px_4px_10px_rgba(0,0,0,0.03)] border border-[#E9E9E9]">
        <div className="flex items-center gap-2.5 w-85 h-12 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg px-4">
          <Search size={20} className="text-[#9CA3AF]" />
          <input
            type="text"
            placeholder="Search staff by name, id, role..."
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

      <div className="bg-white rounded-xl shadow-[0px_4px_10px_rgba(0,0,0,0.03)] border border-[#E9E9E9]">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="border-b border-[#E5E7EB] text-[12px] font-medium text-[#666666] bg-[#FAFAFA]">
                <th className="py-4 px-5">Staff Name</th>
                <th className="py-4 px-5">Role / Department</th>
                <th className="py-4 px-5">Attendance</th>
                <th className="py-4 px-5">Check In</th>
                <th className="py-4 px-5">Check Out</th>
                <th className="py-4 px-5">Working Hours</th>
              </tr>
            </thead>
            <tbody>
              {pagedRows.map((item, idx) => {
                const originalIndex = (safePage - 1) * ROWS_PER_PAGE + idx
                return (
                  <tr
                    key={item.id}
                    className={`border-b border-[#E5E7EB] hover:bg-gray-50 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-[#FAFAFA]'}`}
                  >
                    <td className="py-4 px-5 whitespace-nowrap">
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
                      <div className={`px-3 py-1 rounded-full inline-flex items-center justify-center text-[12px] font-medium ${item.attendance === 'Present' ? 'bg-[#D8F5E5] text-[#34A853]' : 'bg-[#FEE2E2] text-[#EF4444]'}`}>
                        {item.attendance}
                      </div>
                    </td>
                    <td className="py-4 px-5 text-[12px] text-[#212121] whitespace-nowrap">{formatMockTime(originalIndex, 'in')}</td>
                    <td className="py-4 px-5 text-[12px] text-[#212121] whitespace-nowrap">{item.attendance === 'Present' ? formatMockTime(originalIndex, 'out') : '-'}</td>
                    <td className="py-4 px-5 text-[12px] text-[#212121] font-medium whitespace-nowrap">{item.attendance === 'Present' ? formatMockTime(originalIndex, 'hours') : '-'}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

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
            {pageWindow.map((num) => (
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

export default AttendanceTab
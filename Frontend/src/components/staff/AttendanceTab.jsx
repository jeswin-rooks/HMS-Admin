import React, { useEffect, useMemo, useState } from 'react'
import { ChevronDown, X, Eye, User } from 'lucide-react'
import Pagination from '../common/Pagination'
import { SearchBarIcon } from '../common/CustomUiIcons'

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

const AttendanceTab = ({ staffData = [], openAttendanceModalSignal = 0 }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [departmentFilter, setDepartmentFilter] = useState('')
  const [attendanceFilter, setAttendanceFilter] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [showAttendanceModal, setShowAttendanceModal] = useState(false)
  const [selectedStaffForView, setSelectedStaffForView] = useState(null)
  const [attendanceOverrides, setAttendanceOverrides] = useState({})
  const [attendanceForm, setAttendanceForm] = useState({
    staffId: '',
    leaveType: 'Half Day'
  })

  const leaveTypeOptions = ['Present', 'Half Day', 'Absent']

  const rowsWithAttendance = useMemo(() => {
    return staffData.map((item) => ({
      ...item,
      attendance: attendanceOverrides[item.id] || item.attendance
    }))
  }, [staffData, attendanceOverrides])

  const departmentOptions = useMemo(() => [...new Set(rowsWithAttendance.map((item) => item.dept))], [rowsWithAttendance])
  const attendanceOptions = useMemo(() => [...new Set(rowsWithAttendance.map((item) => item.attendance))], [rowsWithAttendance])

  const filteredRows = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    return rowsWithAttendance.filter((item) => {
      const matchesSearch =
        q.length === 0 ||
        item.name.toLowerCase().includes(q) ||
        item.pid.toLowerCase().includes(q) ||
        item.role.toLowerCase().includes(q)

      const matchesDepartment = departmentFilter ? item.dept === departmentFilter : true
      const matchesAttendance = attendanceFilter ? item.attendance === attendanceFilter : true

      return matchesSearch && matchesDepartment && matchesAttendance
    })
  }, [rowsWithAttendance, searchQuery, departmentFilter, attendanceFilter])

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

  const openAttendanceModal = () => {
    setAttendanceForm({
      staffId: staffData[0]?.id ? String(staffData[0].id) : '',
      leaveType: 'Half Day'
    })
    setShowAttendanceModal(true)
  }

  useEffect(() => {
    if (openAttendanceModalSignal > 0) {
      openAttendanceModal()
    }
  }, [openAttendanceModalSignal])

  const saveAttendance = () => {
    if (!attendanceForm.staffId) return

    const selectedId = Number(attendanceForm.staffId)
    setAttendanceOverrides((prev) => ({
      ...prev,
      [selectedId]: attendanceForm.leaveType
    }))
    setShowAttendanceModal(false)
  }

  const pageWindow = useMemo(() => {
    const maxButtons = 7
    const start = Math.max(1, Math.min(safePage - 3, totalPages - (maxButtons - 1)))
    const end = Math.min(totalPages, start + (maxButtons - 1))
    return Array.from({ length: end - start + 1 }, (_, i) => start + i)
  }, [safePage, totalPages])

  const selectedStaffHistory = useMemo(() => {
    if (!selectedStaffForView) return []

    const leave = selectedStaffForView.attendance || 'Absent'
    return [
      { id: 1, date: '11 Aug 2025', leaveType: leave === 'Present' ? 'Half Day' : leave },
      { id: 2, date: '11 Aug 2025', leaveType: 'Absent' },
      { id: 3, date: '11 Aug 2025', leaveType: 'Half Day' },
      { id: 4, date: '11 Aug 2025', leaveType: 'Absent' }
    ]
  }, [selectedStaffForView])

  return (
    <div className="flex flex-col gap-5">
      <div className="bg-white rounded-xl p-5 flex justify-between items-center shadow-[0px_4px_10px_rgba(0,0,0,0.03)] border border-[#E9E9E9]">
        <div className="flex items-center gap-2.5 w-85 h-12 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg px-4">
          <SearchBarIcon />
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
                <th className="py-4 px-5">Action</th>
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
                    <td className="py-4 px-5 whitespace-nowrap">
                      <button
                        onClick={() => setSelectedStaffForView(item)}
                        className="text-[#2563EB] hover:text-blue-700 transition-colors"
                        aria-label="View attendance"
                      >
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <Pagination
          safePage={safePage}
          totalPages={totalPages}
          goToPage={goToPage}
          pageWindow={pageWindow}
        />
      </div>

      {showAttendanceModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="w-full max-w-[360px] rounded-xl bg-[#F1F2F4] shadow-2xl border border-[#CBD2D9] overflow-hidden">
            <div className="h-8 px-3 flex items-center justify-between bg-[#E7EAEE] border-b border-[#D5DAE0]">
              <h3 className="text-[13px] font-semibold text-[#1B2E2A]">Attendance</h3>
              <button onClick={() => setShowAttendanceModal(false)} className="text-[#5E6B72] hover:text-[#1B2E2A]">
                <X size={14} />
              </button>
            </div>

            <div className="p-3 grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-1">
                <label className="text-[9px] text-[#6B7280]">Staff name</label>
                <select
                  value={attendanceForm.staffId}
                  onChange={(e) => setAttendanceForm((prev) => ({ ...prev, staffId: e.target.value }))}
                  className="h-8 rounded-md border border-[#D7DBE0] bg-[#F7F8FA] px-2 text-[11px] text-[#212121]"
                >
                  {staffData.map((item) => (
                    <option key={item.id} value={item.id}>{item.name}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[9px] text-[#6B7280]">Leave Type</label>
                <select
                  value={attendanceForm.leaveType}
                  onChange={(e) => setAttendanceForm((prev) => ({ ...prev, leaveType: e.target.value }))}
                  className="h-8 rounded-md border border-[#D7DBE0] bg-[#F7F8FA] px-2 text-[11px] text-[#212121]"
                >
                  {leaveTypeOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="px-3 pb-3 flex justify-end">
              <button
                onClick={saveAttendance}
                className="h-7 min-w-[56px] rounded-md bg-[#052B2C] text-white text-[10px] font-medium"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedStaffForView && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="w-full max-w-[720px] rounded-xl bg-[#F1F2F4] shadow-2xl border border-[#CBD2D9] overflow-hidden">
            <div className="px-4 py-3 bg-white border-b border-[#D5DAE0] flex items-center">
              <div className="w-10 h-10 rounded-full bg-[#D6F1E6] text-[#1F2937] flex items-center justify-center">
                <User size={16} />
              </div>
              <div className="ml-3">
                <p className="text-[22px] font-semibold text-[#212121] leading-none">{selectedStaffForView.name}</p>
                <p className="text-[13px] text-[#6B7280] mt-1">ID: {selectedStaffForView.pid}</p>
              </div>
              <div className="ml-8">
                <p className="text-[14px] font-medium text-[#212121]">{selectedStaffForView.role || '-'}</p>
                <p className="text-[12px] text-[#6B7280]">{selectedStaffForView.dept || '-'}</p>
              </div>
              <button
                onClick={() => setSelectedStaffForView(null)}
                className="ml-auto text-[#5E6B72] hover:text-[#1B2E2A]"
                aria-label="Close attendance details"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-4 bg-[#F1F2F4]">
              <div className="rounded-xl border border-[#D7DBE0] overflow-hidden bg-white">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#FAFAFA] border-b border-[#E5E7EB] text-[12px] text-[#666666]">
                      <th className="py-3 px-4 font-medium">SL.NO</th>
                      <th className="py-3 px-4 font-medium">Date</th>
                      <th className="py-3 px-4 font-medium">Leave type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedStaffHistory.map((row) => (
                      <tr key={row.id} className="border-b border-[#E5E7EB] last:border-b-0 text-[13px] text-[#212121]">
                        <td className="py-4 px-4">{row.id}</td>
                        <td className="py-4 px-4">{row.date}</td>
                        <td className="py-4 px-4">{row.leaveType}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AttendanceTab
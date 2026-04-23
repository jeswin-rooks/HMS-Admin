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
          <div className="w-[658px] h-[278px] rounded-[12px] bg-[#F3F6F9] border border-[rgba(130,143,143,0.25)] flex flex-col items-center gap-[24px] pb-[24px] overflow-hidden">
            <div className="w-[658px] h-[84px] px-[24px] py-[24px] flex items-center justify-between gap-[30px] bg-white border-b border-[rgba(130,143,143,0.25)] rounded-t-[12px]">
              <h3 className="text-[24px] leading-[36px] font-semibold text-[#051F20]">Attendance</h3>
              <button onClick={() => setShowAttendanceModal(false)} className="w-[24px] h-[24px] flex items-center justify-center text-[#051F20]">
                <X size={24} />
              </button>
            </div>

            <div className="w-[610px] h-[78px] flex items-start gap-[10px]">
              <div className="w-[300px] h-[78px] flex flex-col">
                <label className="w-[300px] h-[24px] text-[13px] leading-[24px] font-normal text-[#666666]">Staff name</label>
                <select
                  value={attendanceForm.staffId}
                  onChange={(e) => setAttendanceForm((prev) => ({ ...prev, staffId: e.target.value }))}
                  className="w-[300px] h-[54px] bg-white border border-[rgba(130,143,143,0.25)] rounded-[8px] px-[10px] text-[16px] leading-[24px] font-normal text-[#212121]"
                >
                  {staffData.map((item) => (
                    <option key={item.id} value={item.id}>{item.name}</option>
                  ))}
                </select>
              </div>

              <div className="w-[300px] h-[78px] flex flex-col">
                <label className="w-[300px] h-[24px] text-[13px] leading-[24px] font-normal text-[#666666]">Leave Type</label>
                <div className="w-[300px] h-[54px] bg-white border border-[rgba(130,143,143,0.25)] rounded-[8px] px-[10px] flex items-center justify-between">
                  <select
                    value={attendanceForm.leaveType}
                    onChange={(e) => setAttendanceForm((prev) => ({ ...prev, leaveType: e.target.value }))}
                    className="w-full bg-transparent border-none outline-none text-[16px] leading-[24px] font-normal text-[#212121] appearance-none"
                  >
                    {leaveTypeOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  <span className="w-[34px] h-[34px] flex items-center justify-center rounded-full shrink-0">
                    <ChevronDown size={24} className="text-[#212121]" />
                  </span>
                </div>
              </div>
            </div>

            <div className="w-[610px] h-[44px] flex items-center justify-end">
              <button
                onClick={saveAttendance}
                className="w-[100px] h-[44px] rounded-[8px] bg-[#051F20] text-white text-[16px] leading-[24px] font-medium shadow-[0px_4px_8px_3px_rgba(0,0,0,0.15),0px_1px_3px_rgba(0,0,0,0.3)]"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedStaffForView && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="w-[658px] h-[455px] rounded-[12px] bg-[#F3F6F9] border border-[rgba(130,143,143,0.25)] flex flex-col items-center gap-[24px] pb-[24px] overflow-hidden">
            <div className="w-[658px] h-[99px] px-[24px] py-[24px] bg-white border-b border-[rgba(130,143,143,0.25)] rounded-t-[12px] flex items-center">
              <div className="w-[610px] h-[51px] flex items-center justify-between gap-[30px]">
                <div className="flex-1 min-w-0 h-[51px] flex items-center justify-between gap-[20px]">
                  <div className="flex-1 min-w-0 h-[51px] flex items-center gap-[20px]">
                    <div className="w-[51px] h-[51px] rounded-full bg-[#D4EDDA] flex items-center justify-center p-[3px]">
                      <User size={24} className="text-[#051F20]" />
                    </div>
                    <div className="flex-1 min-w-0 h-[51px] flex flex-col items-start">
                      <p className="w-full h-[30px] text-[20px] leading-[30px] font-semibold text-[#212121] whitespace-nowrap">{selectedStaffForView.name}</p>
                      <p className="w-full h-[21px] text-[14px] leading-[21px] font-medium text-[#666666]">ID: {selectedStaffForView.pid}</p>
                    </div>
                  </div>

                  <div className="w-[220px] h-[45px] flex flex-col justify-center items-start shrink-0">
                    <p className="w-full h-[21px] text-[14px] leading-[21px] font-medium text-[#212121]">{selectedStaffForView.role || '-'}</p>
                    <p className="w-full h-[24px] text-[13px] leading-[24px] font-normal text-[#666666]">{selectedStaffForView.dept || '-'}</p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedStaffForView(null)}
                  className="w-[24px] h-[24px] flex items-center justify-center text-[#212121]"
                  aria-label="Close attendance details"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="w-[610px] h-[308px] rounded-[12px] border border-[rgba(130,143,143,0.25)] bg-white overflow-hidden">
              <table className="w-full h-full text-left border-collapse">
                <thead>
                  <tr className="h-[56px] border-b border-[rgba(130,143,143,0.25)]">
                    <th className="px-[24px] text-[14px] leading-[21px] font-medium text-[#666666]">SI.NO</th>
                    <th className="px-[24px] text-[14px] leading-[21px] font-medium text-[#666666]">Date</th>
                    <th className="px-[24px] text-[14px] leading-[21px] font-medium text-[#666666]">Leave type</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedStaffHistory.map((row, index) => (
                    <tr
                      key={row.id}
                      className={`h-[63px] ${index !== selectedStaffHistory.length - 1 ? 'border-b border-[rgba(130,143,143,0.25)]' : ''}`}
                    >
                      <td className="px-[24px] text-[14px] leading-[21px] font-medium text-[#212121]">{row.id}</td>
                      <td className="px-[24px] text-[14px] leading-[21px] font-medium text-[#212121]">{row.date}</td>
                      <td className="px-[24px] text-[14px] leading-[21px] font-medium text-[#212121]">{row.leaveType}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AttendanceTab
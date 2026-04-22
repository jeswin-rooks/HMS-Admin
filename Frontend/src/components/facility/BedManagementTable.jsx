import React, { useEffect, useMemo, useState } from 'react';
import { X } from 'lucide-react';
import { useData } from '../../context/DataContext';
import Pagination from '../common/Pagination';
import { EditActionIcon, SaveActionIcon, SearchBarIcon } from '../common/CustomUiIcons';

const BedManagementTable = ({
  data,
  departments,
  statuses,
  searchQuery,
  setSearchQuery,
  departmentFilter,
  setDepartmentFilter,
  statusFilter,
  setStatusFilter,
  onAddNew,
  activeTab
}) => {
  const { updateBedStatus } = useData();
  const [editingId, setEditingId] = useState(null);
  const [editStatus, setEditStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const ROWS_PER_PAGE = 8;

  // Filter data based on search and dropdown filters
  const filteredData = useMemo(() => data.filter((row) => {
    const matchesSearch = row.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          row.roomNo.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = departmentFilter ? row.department === departmentFilter : true;
    const matchesStatus = statusFilter ? row.status === statusFilter : true;
    return matchesSearch && matchesDept && matchesStatus;
  }), [data, searchQuery, departmentFilter, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / ROWS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const pagedData = filteredData.slice((safePage - 1) * ROWS_PER_PAGE, safePage * ROWS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, departmentFilter, statusFilter, activeTab]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const goToPage = (nextPage) => {
    setCurrentPage(Math.max(1, Math.min(nextPage, totalPages)));
  };

  const pageWindow = useMemo(() => {
    const maxButtons = 7;
    const start = Math.max(1, Math.min(safePage - 3, totalPages - (maxButtons - 1)));
    const end = Math.min(totalPages, start + (maxButtons - 1));
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [safePage, totalPages]);

  return (
    <div className="flex-1 overflow-hidden flex flex-col bg-white">
      {/* Action Bar */}
      <div className="xl:px-6 2xl:px-[30px] xl:py-6 2xl:py-[30px] flex flex-col md:flex-row justify-between items-end xl:gap-5 2xl:gap-[30px] bg-white border-b border-[rgba(130,143,143,0.25)]">
        <div className="relative w-full xl:w-[300px] 2xl:w-[350px]">
          <div className="absolute inset-y-0 left-0 pl-[15px] flex items-center pointer-events-none">
            <SearchBarIcon />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 h-[48px] border border-[rgba(130,143,143,0.25)] rounded-xl bg-[#F3F6F9] placeholder-[#666666] text-[#666666] text-[14px] focus:outline-none focus:ring-1 focus:ring-teal-500"
            placeholder="Enter name or Patient Id"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex xl:gap-5 2xl:gap-[30px] items-end w-full md:w-auto justify-end">
          <div className="flex flex-col xl:w-[150px] 2xl:w-[169px]">
            <label className="text-[16px] leading-[24px] font-medium text-[#666666] mb-[15px]" htmlFor="dept-filter">Department</label>
            <div className="relative">
              <select
                id="dept-filter"
                className="appearance-none bg-[#F3F6F9] border border-[rgba(130,143,143,0.25)] text-[#212121] text-[16px] h-[48px] rounded-lg focus:ring-teal-500 block w-full px-[10px]"
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
              >
                <option value="">All</option>
                {departments.map((dept, idx) => (
                  <option key={idx} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col xl:w-[150px] 2xl:w-[169px]">
            <label className="text-[16px] leading-[24px] font-medium text-[#666666] mb-[15px]" htmlFor="status-filter">Status</label>
            <div className="relative">
              <select
                id="status-filter"
                className="appearance-none bg-[#F3F6F9] border border-[rgba(130,143,143,0.25)] text-[#212121] text-[16px] h-[48px] rounded-lg focus:ring-teal-500 block w-full px-[10px]"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">All</option>
                {statuses.map((status, idx) => (
                  <option key={idx} value={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>

          {activeTab !== 'cleaningManagement' && (
            <button
              type="button"
              onClick={onAddNew}
              className="flex flex-row justify-center items-center py-[10px] px-[16px] gap-[10px] w-[104px] h-[48px] bg-[#051F20] text-white hover:bg-[#031112] shadow-[0px_4px_8px_3px_rgba(0,0,0,0.15),_0px_1px_3px_rgba(0,0,0,0.3)] rounded-[8px] text-[16px] font-medium leading-[24px] cursor-pointer transition-colors"
            >
              Add New
            </button>
          )}
        </div>
      </div>

      {/* Table Section */}
      <div className="flex-1 overflow-x-auto overflow-y-auto">
        <table className="min-w-full divide-y divide-[rgba(130,143,143,0.25)]">
          <thead className="bg-[#F3F6F9] sticky top-0">
            <tr className="h-[69px]">
              <th scope="col" className="px-[24px] text-left text-[14px] font-medium text-[#666666]">
                Bed ID
              </th>
              <th scope="col" className="px-[24px] text-left text-[14px] font-medium text-[#666666]">
                Room No
              </th>
              <th scope="col" className="px-[24px] text-left text-[14px] font-medium text-[#666666]">
                Department
              </th>
              <th scope="col" className="px-[24px] text-left text-[14px] font-medium text-[#666666]">
                Discharge date
              </th>
              <th scope="col" className="px-[24px] text-left text-[14px] font-medium text-[#666666]">
                Status
              </th>
              <th scope="col" className="px-[24px] text-left text-[14px] font-medium text-[#666666]">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-[rgba(130,143,143,0.25)]">
            {pagedData.map((bed, idx) => (
              <tr key={idx} className="h-[69px] hover:bg-gray-50 transition-colors">
                <td className="px-[24px] whitespace-nowrap text-[14px] font-medium text-[#212121]">
                  {bed.id}
                </td>
                <td className="px-[24px] whitespace-nowrap text-[14px] font-medium text-[#212121]">
                  {bed.roomNo}
                </td>
                <td className="px-[24px] whitespace-nowrap text-[14px] font-medium text-[#212121]">
                  {bed.department}
                </td>
                <td className="px-[24px] whitespace-nowrap text-[14px] font-medium text-[#212121]">
                  {bed.dischargeDate || '12-08-2000'}
                </td>
                <td className="px-[24px] whitespace-nowrap">
                  {editingId === bed.id ? (
                    <select
                      className="border border-[#235347] rounded-md px-2 py-1 text-[13px] bg-white text-[#212121]"
                      value={editStatus}
                      onChange={(e) => setEditStatus(e.target.value)}
                    >
                      {statuses.map((st, i) => (
                        <option key={i} value={st}>{st}</option>
                      ))}
                    </select>
                  ) : (
                    <span className={`px-[10px] py-[4px] h-[32px] w-[140px] inline-flex items-center justify-center text-center text-[13px] leading-[24px] rounded-full ${
                      bed.status === 'Available' ? 'bg-[#D4EDDA] text-[#28A745]' : 
                      bed.status === 'Cleaning Required' ? 'bg-[#FAD7DA] text-[#E63946]' : 'bg-[#FFF3CD] text-[#A16207]'
                    }`}>
                      {bed.status}
                    </span>
                  )}
                </td>
                <td className="px-[24px] whitespace-nowrap text-sm font-medium">
                  {editingId === bed.id ? (
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => {
                          updateBedStatus(bed.id, editStatus);
                          setEditingId(null);
                        }}
                        className="text-green-600 hover:text-green-900 transition-colors w-[24px] h-[24px]"
                      >
                        <SaveActionIcon />
                      </button>
                      <button 
                        onClick={() => setEditingId(null)}
                        className="text-red-600 hover:text-red-900 transition-colors w-[24px] h-[24px]"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => {
                        setEditingId(bed.id);
                        setEditStatus(bed.status);
                      }}
                      className="text-[#1D4ED8] hover:text-blue-800 transition-colors w-[24px] h-[24px] flex items-center justify-center"
                    >
                      <EditActionIcon />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      <Pagination
        safePage={safePage}
        totalPages={totalPages}
        goToPage={goToPage}
        pageWindow={pageWindow}
      />
    </div>
  );
};

export default BedManagementTable;
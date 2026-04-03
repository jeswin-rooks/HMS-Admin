import React from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'

const menuItems = [
  { path: '/dashboard', label: 'Facility & Bed Management', icon: '▭' },
  { path: '/stock', label: 'Inventory & Orders', icon: '▦' },
  { path: '/finance', label: 'Finance & Operations', icon: '☰' },
  { path: '/follow-up', label: 'Staff Management', icon: '◔' },
]

const MainLayout = ({ children }) => {
  return (
    <div className="h-screen flex flex-col bg-[#F1F1F1] font-['Poppins'] overflow-hidden">
      <header className="h-[88px] w-full px-[40px] flex items-center justify-between bg-[#ACE3CE] border-b-2 border-[rgba(130,143,143,0.25)] relative z-20">
        
          <Link to="/dashboard" className="flex items-center gap-[20px] no-underline">
            <span className="w-[56px] h-[56px] rounded-full bg-[#051F20]" aria-hidden="true" />
            <span className="text-[#051F20] font-medium text-[15px] leading-[22px] w-[81px]">App Name</span>
          </Link>

          <nav className="flex items-center gap-[20px]">
            {menuItems.map((item, idx) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 gap-[10px] rounded-lg transition-all h-[47px] ${
                    isActive 
                    ? 'bg-[#D6F1E6] border-r-4 border-[#235347] shadow-[inset_0px_0px_0px_0px_transparent]' 
                    : 'bg-transparent text-[#212121]'
                  }`
                }
              >
                <span className="text-[24px]" aria-hidden="true">{item.icon}</span>
                <span className="text-[#212121] font-medium text-[15px] leading-[22px]">{item.label}</span>
              </NavLink>
            ))}
          </nav>
    

        <div className="bg-[#051F20] text-white w-[56px] h-[56px] rounded-[30px] flex items-center justify-center font-semibold text-[24px] leading-[36px]" aria-label="User initials">
          SA
        </div>
      </header>

      <main className="flex-1 w-full relative overflow-y-auto">
        {children}
      </main>
    </div>
  )
}

export default MainLayout
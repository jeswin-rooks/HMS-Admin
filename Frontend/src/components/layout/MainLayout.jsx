import React from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'

// Custom Solid Bed SVG exactly matching your design
const SolidBedIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M4 2C3.44772 2 3 2.44772 3 3V21C3 21.5523 3.44772 22 4 22C4.55228 22 5 21.5523 5 21V17H19V21C19 21.5523 19.4477 22 20 22C20.5523 22 21 21.5523 21 21V11C21 8.23858 18.7614 6 16 6H5V3C5 2.44772 4.55228 2 4 2ZM11 8H5V15H11C11.5523 15 12 14.5523 12 14V9C12 8.44772 11.5523 8 11 8Z" />
  </svg>
)

const InventoryIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M4 10V8C4 5.79086 5.79086 4 8 4H9V10H4Z" />
    <path d="M11 4H13V10H11V4Z" />
    <path d="M15 4H16C18.2091 4 20 5.79086 20 8V10H15V4Z" />
    <path d="M4 14V18C4 19.1046 4.89543 20 6 20H9V14H4Z" />
    <path d="M11 14H13V20H11V14Z" />
    <path d="M10 9H14V13H10V9Z" />
    <path d="M15 14V20H18C19.1046 20 20 19.1046 20 18V14H15Z" />
  </svg>
)

const FinanceIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 2V4H6C4.895 4 4 4.895 4 6C4 7.105 4.895 8 6 8H9V12H6C4.343 12 3 13.343 3 15C3 16.657 4.343 18 6 18V20H8V18H10C11.105 18 12 17.105 12 16C12 14.895 11.105 14 10 14H7V10H10C11.657 10 13 8.657 13 7C13 5.343 11.657 4 10 4V2H8Z"/>
    <path d="M13 4H20C21.105 4 22 4.895 22 6V18C22 19.105 21.105 20 20 20H13V18H20V6H13V4Z"/>
    <rect x="14" y="8" width="4" height="2" />
    <rect x="14" y="12" width="4" height="2" />
  </svg>
)

const StaffIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C13.2929 2 14.5284 2.24584 15.6599 2.68962L14.73 4.86C13.864 4.509 12.946 4.31 12 4.31C7.752 4.31 4.31 7.752 4.31 12C4.31 16.248 7.752 19.69 12 19.69C16.248 19.69 19.69 16.248 19.69 12C19.69 10.8711 19.4449 9.79975 19.0064 8.81423L21.1091 7.74716C21.6841 8.94828 22 10.4355 22 12C22 17.5228 17.5228 22 12 22Z" />
    <circle cx="12" cy="10" r="3.5" />
    <path d="M16 17H8C8 15 9.5 14 12 14C14.5 14 16 15 16 17Z" />
    <path fillRule="evenodd" clipRule="evenodd" d="M19 1L19.6 2.8H21.5L20 4L20.6 5.8L19 4.8L17.4 5.8L18 4L16.5 2.8H18.4L19 1ZM19 4.3C19.5523 4.3 20 3.85228 20 3.25C20 2.64772 19.5523 2.2 19 2.2C18.4477 2.2 18 2.64772 18 3.25C18 3.85228 18.4477 4.3 19 4.3Z" />
  </svg>
)

const menuItems = [
  { path: '/dashboard', label: 'Facility & Bed Management', icon: <SolidBedIcon /> },
  { path: '/stock', label: 'Inventory & Orders', icon: <InventoryIcon /> },
  { path: '/finance', label: 'Finance & Operations', icon: <FinanceIcon /> },
  { path: '/staff', label: 'Staff Management', icon: <StaffIcon /> },
]

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F1F1F1] font-['Poppins']">
      <header className="h-[88px] w-full px-[40px] flex items-center justify-between bg-[#ACE3CE] border-b-2 border-[rgba(130,143,143,0.25)] relative z-20">
        
          <Link to="/dashboard" className="flex items-center gap-[20px] no-underline">
            <span className="w-[44px] h-[44px] rounded-full bg-[#051F20]" aria-hidden="true" />
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
                <div className="flex items-center justify-center w-6 h-6" aria-hidden="true">
                  {item.icon}
                </div>
                <span className="text-[#212121] font-medium text-[15px] leading-[22px]">{item.label}</span>
              </NavLink>
            ))}
          </nav>
    

        <div className="bg-[#051F20] text-white w-[44px] h-[44px] rounded-[30px] flex items-center justify-center font-semibold text-[20px] leading-[36px]" aria-label="User initials">
          SA
        </div>
      </header>

      <main className="flex-1 w-full relative">
        {children}
      </main>
    </div>
  )
}

export default MainLayout
import React from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'

const menuItems = [
  { path: '/', label: 'Facility & Bed Management', icon: '▭' },
  { path: '/stock', label: 'Inventory & Orders', icon: '▦' },
  { path: '/sales-courier', label: 'Finance & Operations', icon: '☰' },
  { path: '/follow-up', label: 'Staff Management', icon: '◔' },
]

const MainLayout = () => {
  return (
    <div className="app-shell">
      <header className="navbar">
        
          <Link to="/" className="brand">
            <span className="brand-mark" aria-hidden="true" />
            <span className="brand-label">App Name</span>
          </Link>

          <nav className="menu">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  isActive ? 'menu-link menu-link-active' : 'menu-link'
                }
              >
                <span className="menu-icon" aria-hidden="true">{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
    

        <div className="avatar-chip" aria-label="User initials">
          SA
        </div>
      </header>

      <main className="page-content">
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout
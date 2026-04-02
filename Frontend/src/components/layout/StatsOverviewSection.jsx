import React from 'react'

const StatsOverviewSection = ({ subtitle = 'Hello Name', title = 'Welcome Back', stats = [] }) => {
  return (
    <section className="dashboard-screen">
      <div className="dashboard-hero">
        <p className="hello-text">{subtitle}</p>
        <h1 className="welcome-text">{title}</h1>
      </div>

      <div className="stat-grid">
        {stats.map((item) => (
          <article key={item.title} className="stat-card">
            <header className="stat-head">
              <h2>{item.title}</h2>
              <span className={`stat-icon stat-icon-${item.tone}`}>{item.icon}</span>
            </header>
            <strong>{item.value}</strong>
          </article>
        ))}
      </div>
    </section>
  )
}

export default StatsOverviewSection
import { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';

const ParentLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="parent-layout">
      <header className="parent-header">
        <div className="header-content">
          <div className="logo">
            <h1>🦉 MathMaster</h1>
            <span>Parent Dashboard</span>
          </div>
          <nav className="parent-nav">
            <Link to="/parent" className="nav-link">📊 Dashboard</Link>
            <Link to="/parent/reports" className="nav-link">📈 Reports</Link>
            <Link to="/parent/subscription" className="nav-link">💳 Subscription</Link>
            <Link to="/parent/settings" className="nav-link">⚙️ Settings</Link>
            <button onClick={handleLogout} className="logout-btn">🚪 Logout</button>
          </nav>
        </div>
      </header>
      <main className="parent-main">
        <Outlet />
      </main>
    </div>
  );
};

export default ParentLayout;

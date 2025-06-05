import { Outlet, NavLink } from 'react-router-dom';
import { Home, Settings, CreditCard, BarChart2, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ParentLayout = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    // In a real app, we would handle logout logic here
    navigate('/');
  };
  
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-sidebar text-sidebar-foreground hidden md:block">
        <div className="p-4">
          <h1 className="text-2xl font-bold">MathMaster</h1>
          <p className="text-sm opacity-75">Parent Dashboard</p>
        </div>
        
        <nav className="mt-8">
          <SidebarLink to="/parent" icon={<Home />} label="Dashboard" />
          <SidebarLink to="/parent/reports" icon={<BarChart2 />} label="Reports" />
          <SidebarLink to="/parent/subscription" icon={<CreditCard />} label="Subscription" />
          <SidebarLink to="/parent/settings" icon={<Settings />} label="Settings" />
          
          <button 
            className="flex items-center w-full px-4 py-3 text-left hover:bg-sidebar-accent/10 transition-colors"
            onClick={handleLogout}
          >
            <span className="mr-3"><LogOut size={18} /></span>
            <span>Logout</span>
          </button>
        </nav>
      </aside>
      
      {/* Mobile header */}
      <header className="fixed top-0 left-0 right-0 bg-primary p-4 text-white md:hidden z-10">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">MathMaster</h1>
          <button className="p-2">
            <Settings size={20} />
          </button>
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-1 md:p-8 p-4 pt-20 md:pt-4">
        <Outlet />
      </main>
      
      {/* Mobile navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2 md:hidden">
        <div className="flex justify-around">
          <MobileNavLink to="/parent" icon={<Home />} />
          <MobileNavLink to="/parent/reports" icon={<BarChart2 />} />
          <MobileNavLink to="/parent/subscription" icon={<CreditCard />} />
          <MobileNavLink to="/parent/settings" icon={<Settings />} />
        </div>
      </nav>
    </div>
  );
};

// Sidebar link component
const SidebarLink = ({ to, icon, label }) => {
  return (
    <NavLink 
      to={to} 
      className={({ isActive }) => 
        `flex items-center px-4 py-3 ${
          isActive ? 'bg-sidebar-accent/20 font-bold' : 'hover:bg-sidebar-accent/10'
        } transition-colors`
      }
      end={to === '/parent'}
    >
      <span className="mr-3">{icon}</span>
      <span>{label}</span>
    </NavLink>
  );
};

// Mobile navigation link component
const MobileNavLink = ({ to, icon }) => {
  return (
    <NavLink 
      to={to} 
      className={({ isActive }) => 
        `p-3 rounded-lg ${
          isActive ? 'text-primary' : 'text-gray-500'
        }`
      }
      end={to === '/parent'}
    >
      {icon}
    </NavLink>
  );
};

export default ParentLayout;


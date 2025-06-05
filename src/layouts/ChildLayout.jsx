import { Outlet, NavLink } from 'react-router-dom';
import { Home, BookOpen, Gamepad2, Award } from 'lucide-react';

const ChildLayout = () => {
  return (
    <div className="min-h-screen bg-sky-100">
      {/* Header */}
      <header className="bg-primary p-4 text-white">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">MathMaster</h1>
          <div className="flex items-center gap-2">
            {/* In a real app, we would show the child's avatar and name */}
            <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
              🦊
            </div>
            <span className="font-bold">Fox</span>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="container mx-auto p-4 pb-20">
        <Outlet />
      </main>
      
      {/* Bottom navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2">
        <div className="container mx-auto flex justify-around">
          <NavItem to="/child" icon={<Home />} label="Home" />
          <NavItem to="/child/lesson/1" icon={<BookOpen />} label="Lessons" />
          <NavItem to="/child/exercise/1" icon={<Gamepad2 />} label="Practice" />
          <NavItem to="/child/achievements" icon={<Award />} label="Rewards" />
        </div>
      </nav>
    </div>
  );
};

// Navigation item component
const NavItem = ({ to, icon, label }) => {
  return (
    <NavLink 
      to={to} 
      className={({ isActive }) => 
        `flex flex-col items-center p-2 rounded-lg ${
          isActive ? 'text-primary font-bold' : 'text-gray-500'
        }`
      }
      end={to === '/child'}
    >
      <div className="text-xl mb-1">{icon}</div>
      <span className="text-xs">{label}</span>
    </NavLink>
  );
};

export default ChildLayout;


import { Outlet, Link } from 'react-router-dom';
import Mascot from '../components/child/Mascot';

const ChildLayout = () => {
  return (
    <div className="child-layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1>🦉 MathMaster</h1>
        </div>
        
        <Mascot />
        
        <nav className="nav-menu">
          <ul>
            <li className="nav-item">
              <Link to="/child" className="nav-link">
                <span className="nav-icon">🏠</span>
                <span>Home</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/child/lessons" className="nav-link">
                <span className="nav-icon">📚</span>
                <span>Lessons</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/child/practice" className="nav-link">
                <span className="nav-icon">✏️</span>
                <span>Practice</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/child/achievements" className="nav-link">
                <span className="nav-icon">🏆</span>
                <span>Rewards</span>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default ChildLayout;

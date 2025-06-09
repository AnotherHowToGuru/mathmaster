import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Import pages
import Login from './pages/Login';
import ChildDashboard from './pages/ChildDashboard';
import LessonScreen from './pages/LessonScreen';
import ExerciseScreen from './pages/ExerciseScreen';
import AchievementsScreen from './pages/AchievementsScreen';
import ParentDashboard from './pages/ParentDashboard';

// Import layouts
import ChildLayout from './layouts/ChildLayout';
import ParentLayout from './layouts/ParentLayout';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Login />} />
        
        {/* Child routes */}
        <Route path="/child" element={<ChildLayout />}>
          <Route index element={<ChildDashboard />} />
          <Route path="lesson/:id" element={<LessonScreen />} />
          <Route path="exercise/:id" element={<ExerciseScreen />} />
          <Route path="achievements" element={<AchievementsScreen />} />
        </Route>
        
        {/* Parent routes */}
        <Route path="/parent" element={<ParentLayout />}>
          <Route index element={<ParentDashboard />} />
          <Route path="settings" element={<div>Settings Page</div>} />
          <Route path="subscription" element={<div>Subscription Page</div>} />
          <Route path="reports" element={<div>Reports Page</div>} />
        </Route>
        
        {/* Catch all - 404 */}
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;


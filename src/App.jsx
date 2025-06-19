import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ChildDashboard from './pages/ChildDashboard';
import ParentDashboard from './pages/ParentDashboard';
import Login from './pages/Login';
import TopicLessons from './pages/TopicLessons';
import LessonScreen from './pages/LessonScreen';
import ExerciseScreen from './pages/ExerciseScreen';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/child" element={<Navigate to="/child/dashboard" replace />} /> {/* Redirect /child to /child/dashboard */}
        <Route path="/child/dashboard" element={<ChildDashboard />} />
        <Route path="/parent/dashboard" element={<ParentDashboard />} />
        <Route path="/child/topic/:topicId" element={<TopicLessons />} />
        <Route path="/child/lesson/:lessonId" element={<LessonScreen />} />
        <Route path="/child/exercise/:exerciseId" element={<ExerciseScreen />} />
      </Routes>
    </Router>
  );
}

export default App;

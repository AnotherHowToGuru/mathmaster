import { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import apiService from '../services/api';

const TopicLessons = () => {
  const { topicId } = useParams();
  const location = useLocation();
  const topicTitle = location.state?.topicTitle || 'Math Topic';
  
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  // Demo lessons for now
  const demoLessons = [
    {
      id: 1,
      title: "Counting to 10",
      description: "Learn to count from 1 to 10 with fun activities",
      difficulty: 1,
      estimated_time: 15,
      completed: false
    },
    {
      id: 2,
      title: "Number Recognition",
      description: "Recognize and identify numbers 1-10",
      difficulty: 1,
      estimated_time: 20,
      completed: true
    },
    {
      id: 3,
      title: "Comparing Numbers",
      description: "Learn which numbers are bigger or smaller",
      difficulty: 2,
      estimated_time: 25,
      completed: false
    }
  ];

  useEffect(() => {
    // For now, use demo lessons
    setLessons(demoLessons);
    setLoading(false);
  }, [topicId]);

  if (loading) {
    return <div className="loading">Loading lessons...</div>;
  }

  return (
    <div className="topic-lessons">
      <div className="lessons-header">
        <Link to="/child" className="back-button">← Back to Dashboard</Link>
        <h1>{topicTitle}</h1>
        <p>Choose a lesson to start learning!</p>
      </div>

      <div className="lessons-grid">
        {lessons.map(lesson => (
          <div key={lesson.id} className={`lesson-card ${lesson.completed ? 'completed' : ''}`}>
            <div className="lesson-header">
              <h3>{lesson.title}</h3>
              {lesson.completed && <span className="completed-badge">✅ Complete</span>}
            </div>
            <p className="lesson-description">{lesson.description}</p>
            <div className="lesson-meta">
              <span className="difficulty">
                {'⭐'.repeat(lesson.difficulty)} Difficulty
              </span>
              <span className="time">🕐 {lesson.estimated_time} min</span>
            </div>
            <Link 
              to={`/child/lesson/${lesson.id}`}
              className="lesson-button"
            >
              {lesson.completed ? 'Review Lesson' : 'Start Lesson'}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopicLessons;

import { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import apiService from '../services/api';

const TopicLessons = () => {
  const { topicId } = useParams();
  const location = useLocation();
  const topicTitle = location.state?.topicTitle || 'Math Topic';
  
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  // Demo lessons based on the topic
  const getDemoLessons = (topicName) => {
    const lessonMap = {
      'Number and Place Value': [
        { id: 1, title: "Counting to 10", description: "Learn to count from 1 to 10 with fun activities", difficulty: 1, estimated_time: 15, completed: false },
        { id: 2, title: "Number Recognition", description: "Recognize and identify numbers 1-10", difficulty: 1, estimated_time: 20, completed: true },
        { id: 3, title: "Comparing Numbers", description: "Learn which numbers are bigger or smaller", difficulty: 2, estimated_time: 25, completed: false }
      ],
      'Addition and Subtraction': [
        { id: 4, title: "Adding with Objects", description: "Use toys and objects to learn addition", difficulty: 1, estimated_time: 20, completed: false },
        { id: 5, title: "Simple Subtraction", description: "Take away objects to learn subtraction", difficulty: 1, estimated_time: 20, completed: false },
        { id: 6, title: "Number Bonds to 10", description: "Learn different ways to make 10", difficulty: 2, estimated_time: 30, completed: false }
      ],
      'Measurement': [
        { id: 7, title: "Measuring Length", description: "Use rulers and measuring tapes", difficulty: 1, estimated_time: 25, completed: false },
        { id: 8, title: "Comparing Sizes", description: "Which is bigger, smaller, longer, shorter?", difficulty: 1, estimated_time: 20, completed: false },
        { id: 9, title: "Telling Time", description: "Learn to read clocks and tell time", difficulty: 2, estimated_time: 30, completed: false }
      ]
    };
    
    return lessonMap[topicName] || [
      { id: 10, title: "Introduction", description: `Learn the basics of ${topicName}`, difficulty: 1, estimated_time: 20, completed: false },
      { id: 11, title: "Practice", description: `Practice ${topicName} skills`, difficulty: 2, estimated_time: 25, completed: false }
    ];
  };

  useEffect(() => {
    const loadLessons = async () => {
      try {
        setLoading(true);
        
        // Try to load lessons from backend
        // const backendLessons = await apiService.getLessons(topicId);
        
        // For now, use demo lessons based on topic title
        const demoLessons = getDemoLessons(topicTitle);
        setLessons(demoLessons);
        
      } catch (error) {
        console.error('Failed to load lessons:', error);
        // Use demo lessons as fallback
        const demoLessons = getDemoLessons(topicTitle);
        setLessons(demoLessons);
      } finally {
        setLoading(false);
      }
    };

    loadLessons();
  }, [topicId, topicTitle]);

  if (loading) {
    return (
      <div className="topic-lessons">
        <div className="lessons-header">
          <h1>Loading lessons...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="topic-lessons">
      <div className="lessons-header">
        <Link to="/child" className="back-button">← Back to Dashboard</Link>
        <h1>{topicTitle}</h1>
        <p>Choose a lesson to start learning!</p>
      </div>

      <div className="lessons-grid">
      {lessons.map((lesson) => (
  <div 
    key={lesson.id} 
    className="lesson-card"
    onClick={() => navigate(`/child/lesson/${lesson.id}`)}
    style={{ cursor: 'pointer' }}
  >
    <div className="lesson-header">
      <h3>{lesson.title}</h3>
      {lesson.completed && <span className="completed-badge">Completed</span>}
    </div>
    <p className="lesson-description">{lesson.description}</p>
    <div className="lesson-meta">
      <span>Difficulty: {renderDifficultyStars(lesson.difficulty)}</span>
      <span>{lesson.estimated_time} mins</span>
    </div>
    <div className="lesson-actions">
      <button
        className="primary-button"
        onClick={(e) => {
          e.stopPropagation(); // Prevent triggering the parent's onClick
          navigate(`/child/lesson/${lesson.id}`);
        }}
      >
        Start Lesson
      </button>
    </div>
  </div>
))}

      </div>
    </div>
  );
};

export default TopicLessons;

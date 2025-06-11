import { useState, useEffect } from 'react';
import apiService from '../services/api';

const ChildDashboard = () => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Default topics as fallback
  const defaultTopics = [
    {
      id: 1,
      title: "Numbers",
      icon: "🔢",
      description: "Learn to count and understand numbers",
      progress: 75,
      color: "#ff6b6b"
    },
    {
      id: 2,
      title: "Shapes",
      icon: "🔺",
      description: "Discover circles, squares, and triangles",
      progress: 60,
      color: "#4ecdc4"
    },
    {
      id: 3,
      title: "Measuring",
      icon: "📏",
      description: "Learn about size, length, and weight",
      progress: 40,
      color: "#45b7d1"
    },
    {
      id: 4,
      title: "Games",
      icon: "🎮",
      description: "Fun math games and challenges",
      progress: 85,
      color: "#96ceb4"
    }
  ];

  useEffect(() => {
    const loadTopics = async () => {
      try {
        setLoading(true);
        
        // Test API health first
        const healthCheck = await apiService.healthCheck();
        console.log('API Health Check:', healthCheck);
        
        // Try to load topics from backend
        const backendTopics = await apiService.getTopics();
        console.log('Backend Topics:', backendTopics);
        
        if (backendTopics && backendTopics.length > 0) {
          // Map backend data to frontend format
          const mappedTopics = backendTopics.map((topic, index) => ({
            id: topic.id || index + 1,
            title: topic.name || topic.title,
            icon: getTopicIcon(topic.name || topic.title),
            description: topic.description || `Learn about ${topic.name || topic.title}`,
            progress: Math.floor(Math.random() * 100), // Random progress for now
            color: getTopicColor(index)
          }));
          setTopics(mappedTopics);
        } else {
          // Use default topics if no backend data
          setTopics(defaultTopics);
        }
      } catch (error) {
        console.error('Failed to load topics:', error);
        setError(error.message);
        // Use default topics as fallback
        setTopics(defaultTopics);
      } finally {
        setLoading(false);
      }
    };

    loadTopics();
  }, []);

  const getTopicIcon = (topicName) => {
    const iconMap = {
      'Numbers': '🔢',
      'Number and Place Value': '🔢',
      'Addition and Subtraction': '➕',
      'Multiplication and Division': '✖️',
      'Fractions': '🍰',
      'Measurement': '📏',
      'Geometry': '🔺',
      'Statistics': '📊'
    };
    return iconMap[topicName] || '📚';
  };

  const getTopicColor = (index) => {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'];
    return colors[index % colors.length];
  };

  if (loading) {
    return (
      <div className="child-dashboard">
        <div className="dashboard-header">
          <h1>Loading... 🔄</h1>
          <p>Getting your math topics ready!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="child-dashboard">
      <div className="dashboard-header">
        <h1>Hi Emma! 👋</h1>
        <p>Ready to learn some math today?</p>
        {error && (
          <div className="error-message">
            <p>⚠️ Using demo data (Backend: {error})</p>
          </div>
        )}
      </div>

      <div className="quick-stats">
        <div className="stat-card">
          <span className="stat-icon">⭐</span>
          <div>
            <span className="stat-number">123</span>
            <span className="stat-label">Stars Earned</span>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">🏆</span>
          <div>
            <span className="stat-number">8</span>
            <span className="stat-label">Achievements</span>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">🔥</span>
          <div>
            <span className="stat-number">5</span>
            <span className="stat-label">Day Streak</span>
          </div>
        </div>
      </div>

      <div className="topics-section">
        <h2>Choose a Topic to Learn</h2>
        <div className="topics-grid">
          {topics.map(topic => (
            <div key={topic.id} className="topic-card" style={{'--topic-color': topic.color}}>
              <div className="topic-icon">{topic.icon}</div>
              <h3 className="topic-title">{topic.title}</h3>
              <p className="topic-description">{topic.description}</p>
              <div className="progress-section">
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{width: `${topic.progress}%`, backgroundColor: topic.color}}
                  ></div>
                </div>
                <span className="progress-text">{topic.progress}% Complete</span>
              </div>
              <button className="topic-button" style={{backgroundColor: topic.color}}>
                Start Learning!
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="daily-challenge">
        <h2>🎯 Today's Challenge</h2>
        <div className="challenge-card">
          <div className="challenge-content">
            <h3>Addition Adventure</h3>
            <p>Complete 5 addition problems to earn a special star!</p>
            <div className="challenge-progress">
              <span>Progress: 3/5</span>
              <div className="progress-bar">
                <div className="progress-fill" style={{width: '60%'}}></div>
              </div>
            </div>
          </div>
          <button className="challenge-button">Continue Challenge</button>
        </div>
      </div>
    </div>
  );
};

export default ChildDashboard;

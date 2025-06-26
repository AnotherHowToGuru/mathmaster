import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/api';
import '../App.css';
import '../TopicCard.css';
import ChildLayout from '../layouts/ChildLayout';

const ChildDashboard = () => {
  const navigate = useNavigate();
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await apiService.getTopics();
        console.log('Topics loaded:', response);
        setTopics(response);
        setLoading(false);
      } catch (err) {
        console.error('Failed to load topics:', err);
        setError('Failed to load topics. Please try again later.');
        setLoading(false);
      }
    };

    fetchTopics();
  }, []);

  const handleTopicClick = (topic) => {
    // Add haptic feedback for mobile devices
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
    
    // Navigate to topic lessons
    navigate(`/child/topic/${topic.id}`);
  };

  const getTopicDataAttribute = (topicName) => {
    return topicName.toLowerCase().replace(/\s+/g, '-');
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return '#48bb78'; // Green for high progress
    if (progress >= 50) return '#ed8936'; // Orange for medium progress
    return '#4299e1'; // Blue for low progress
  };

  console.log('Rendering with topics:', topics, 'Loading:', loading);

  if (loading) {
    return (
      <ChildLayout>
        <div className="child-dashboard">
          <h1>Loading your learning adventure...</h1>
          <div className="topics-grid">
            {[1, 2].map((i) => (
              <div key={i} className="topic-card loading">
                <div className="topic-icon">🎯</div>
                <h3>Loading...</h3>
                <p>Preparing your math journey</p>
              </div>
            ))}
          </div>
        </div>
      </ChildLayout>
    );
  }

  if (error) {
    return (
      <ChildLayout>
        <div className="child-dashboard">
          <h1>Oops! Something went wrong</h1>
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p style={{ fontSize: '1.2rem', color: '#e53e3e', marginBottom: '1rem' }}>
              {error}
            </p>
            <button 
              onClick={() => window.location.reload()}
              style={{
                background: '#4299e1',
                color: 'white',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                fontSize: '1rem',
                cursor: 'pointer'
              }}
            >
              Try Again
            </button>
          </div>
        </div>
      </ChildLayout>
    );
  }

  return (
    <ChildLayout>
      <div className="child-dashboard">
        <h1>Choose a Topic to Learn</h1>
        <div className="topics-grid">
          {topics.map((topic) => {
            const progress = topic.progress || 0;
            const isCompleted = progress >= 100;
            
            return (
              <div
                key={topic.id}
                className="topic-card"
                data-topic={getTopicDataAttribute(topic.name)}
                data-completed={isCompleted}
                onClick={() => handleTopicClick(topic)}
                role="button"
                tabIndex={0}
                aria-label={`Start learning ${topic.name}. ${progress}% complete.`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleTopicClick(topic);
                  }
                }}
              >
                <div className="topic-icon" role="img" aria-label={`${topic.name} icon`}>
                  {topic.icon}
                </div>
                <h3>{topic.name}</h3>
                <p>{topic.description}</p>
                <div className="progress-bar-container" role="progressbar" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
                  <div 
                    className="progress-bar" 
                    style={{ 
                      width: `${progress}%`,
                      background: `linear-gradient(90deg, ${getProgressColor(progress)} 0%, ${getProgressColor(progress)}dd 100%)`
                    }}
                  ></div>
                </div>
                <span className="progress-text">
                  {progress}% Complete
                  {isCompleted && ' 🎉'}
                </span>
              </div>
            );
          })}
        </div>
        
        {/* Motivational message */}
        <div style={{ 
          textAlign: 'center', 
          marginTop: '3rem', 
          padding: '1.5rem',
          background: 'linear-gradient(135deg, #fef5e7 0%, #fed7aa 100%)',
          borderRadius: '16px',
          border: '2px solid #f6ad55'
        }}>
          <h3 style={{ color: '#c05621', marginBottom: '0.5rem' }}>
            🌟 Keep Learning, Keep Growing! 🌟
          </h3>
          <p style={{ color: '#744210', fontSize: '1rem' }}>
            Every lesson brings you closer to becoming a math master!
          </p>
        </div>
      </div>
    </ChildLayout>
  );
};

export default ChildDashboard;


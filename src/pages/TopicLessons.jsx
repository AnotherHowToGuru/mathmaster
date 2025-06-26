import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Clock, Star, Play } from 'lucide-react';
import api from '../services/api';
import '../App.css';
import '../LessonCard.css';

const TopicLessons = () => {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const [topic, setTopic] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const topicResponse = await api.getTopic(topicId);
        setTopic(topicResponse);
        
        const lessonsResponse = await api.getLessons(topicId);
        setLessons(lessonsResponse);
        setLoading(false);
      } catch (err) {
        console.error('Failed to load topic or lessons:', err);
        setError('Failed to load topic or lessons. Please try again later.');
        setLoading(false);
      }
    };

    fetchTopic();
  }, [topicId]);

  const handleLessonClick = (lesson) => {
    // Add haptic feedback for mobile devices
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
    
    navigate(`/child/lesson/${lesson.id}`);
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      1: '#48bb78', // Easy - Green
      2: '#4299e1', // Medium - Blue  
      3: '#ed8936', // Hard - Orange
      4: '#e53e3e', // Very Hard - Red
      5: '#9f7aea'  // Expert - Purple
    };
    return colors[difficulty] || '#4299e1';
  };

  const getDifficultyLabel = (difficulty) => {
    const labels = {
      1: 'Easy',
      2: 'Medium', 
      3: 'Hard',
      4: 'Very Hard',
      5: 'Expert'
    };
    return labels[difficulty] || 'Medium';
  };

  const renderDifficultyStars = (difficulty) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={`difficulty-star ${i < difficulty ? 'filled' : 'empty'}`}
        style={{ color: i < difficulty ? getDifficultyColor(difficulty) : '#e2e8f0' }}
      />
    ));
  };

  if (loading) {
    return (
      <div className="topic-lessons-container">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <h2>Loading your lessons...</h2>
          <p>Preparing your math adventure!</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="topic-lessons-container">
        <div className="error-state">
          <div className="error-icon">😕</div>
          <h2>Oops! Something went wrong</h2>
          <p>{error}</p>
          <button 
            className="retry-button"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!topic) {
    return (
      <div className="topic-lessons-container">
        <div className="error-state">
          <div className="error-icon">🔍</div>
          <h2>Topic not found</h2>
          <p>We couldn't find the topic you're looking for.</p>
          <button 
            className="back-to-dashboard-button"
            onClick={() => navigate('/child/dashboard')}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="topic-lessons-container">
      <div className="topic-header">
        <button 
          className="back-button" 
          onClick={() => navigate('/child/dashboard')}
          aria-label="Go back to dashboard"
        >
          <ChevronLeft size={24} />
          <span>Back</span>
        </button>
        
        <div className="topic-title-section">
          <div className="topic-icon">{topic.icon}</div>
          <div className="topic-info">
            <h1>{topic.name}</h1>
            <p className="topic-description">{topic.description}</p>
          </div>
        </div>
      </div>
      
      <div className="lessons-section">
        <div className="section-header">
          <h2>Choose a Lesson</h2>
          <p>Start your learning journey!</p>
        </div>
        
        <div className="lessons-grid">
          {lessons.map((lesson, index) => (
            <div 
              key={lesson.id} 
              className={`lesson-card ${lesson.completed ? 'completed' : ''}`}
              onClick={() => handleLessonClick(lesson)}
              role="button"
              tabIndex={0}
              aria-label={`Start lesson: ${lesson.title}. Difficulty: ${getDifficultyLabel(lesson.difficulty)}. Duration: ${lesson.estimated_time} minutes.`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleLessonClick(lesson);
                }
              }}
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              <div className="lesson-number">
                {index + 1}
              </div>
              
              {lesson.completed && (
                <div className="completed-badge">
                  <Star size={16} fill="currentColor" />
                  Completed!
                </div>
              )}
              
              <div className="lesson-content">
                <h3 className="lesson-title">{lesson.title}</h3>
                <p className="lesson-description">{lesson.description}</p>
                
                <div className="lesson-meta">
                  <div className="difficulty-section">
                    <span className="meta-label">Difficulty:</span>
                    <div className="difficulty-stars">
                      {renderDifficultyStars(lesson.difficulty)}
                    </div>
                    <span className="difficulty-label" style={{ color: getDifficultyColor(lesson.difficulty) }}>
                      {getDifficultyLabel(lesson.difficulty)}
                    </span>
                  </div>
                  
                  <div className="time-section">
                    <Clock size={16} className="time-icon" />
                    <span>{lesson.estimated_time} mins</span>
                  </div>
                </div>
              </div>
              
              <div className="lesson-action">
                <button className="start-lesson-button">
                  <Play size={20} fill="currentColor" />
                  <span>{lesson.completed ? 'Review' : 'Start'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {lessons.length === 0 && (
          <div className="no-lessons-state">
            <div className="no-lessons-icon">📚</div>
            <h3>No lessons available yet</h3>
            <p>New lessons are coming soon! Check back later.</p>
          </div>
        )}
      </div>
      
      {/* Progress Summary */}
      <div className="progress-summary">
        <div className="progress-card">
          <h3>Your Progress</h3>
          <div className="progress-stats">
            <div className="stat">
              <span className="stat-number">{lessons.filter(l => l.completed).length}</span>
              <span className="stat-label">Completed</span>
            </div>
            <div className="stat">
              <span className="stat-number">{lessons.length}</span>
              <span className="stat-label">Total Lessons</span>
            </div>
            <div className="stat">
              <span className="stat-number">
                {lessons.length > 0 ? Math.round((lessons.filter(l => l.completed).length / lessons.length) * 100) : 0}%
              </span>
              <span className="stat-label">Complete</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicLessons;


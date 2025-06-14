import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import api from '../services/api';
import '../App.css';
import './LessonCard.css'; // Add this line for the new CSS

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
        
        const lessonsResponse = await api.getLessonsByTopic(topicId);
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

  const renderDifficultyStars = (difficulty) => {
    const stars = [];
    for (let i = 0; i < difficulty; i++) {
      stars.push('★');
    }
    for (let i = difficulty; i < 5; i++) {
      stars.push('☆');
    }
    return stars.join('');
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!topic) {
    return <div className="error">Topic not found</div>;
  }

  return (
    <div className="topic-lessons-container">
      <div className="topic-header">
        <button className="back-button" onClick={() => navigate('/child/dashboard')}>
          <ChevronLeft size={24} />
          Back
        </button>
        <h1>{topic.name}</h1>
      </div>
      
      <div className="topic-description">
        <p>{topic.description}</p>
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

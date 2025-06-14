import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import api from '../services/api';
import '../App.css';
import '../LessonCard.css'; // Make sure this path is correct

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
        
        // Make sure this matches your API service method name
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
            className="lesson-card clickable"
            style={{ cursor: 'pointer', position: 'relative' }}
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
            
            {/* Invisible overlay to make the entire card clickable */}
            <div 
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 10,
                cursor: 'pointer'
              }}
              onClick={() => navigate(`/child/lesson/${lesson.id}`)}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopicLessons;

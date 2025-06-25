import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/api';
import '../App.css';
import '../TopicCard.css'; // Assuming you have a CSS file for topic cards
import ChildLayout from '../layouts/ChildLayout'; // Import the ChildLayout component

const ChildDashboard = () => {
  const navigate = useNavigate();
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await apiService.getTopics();
        setTopics(response);
        console.log('Topics loaded:', response);
        setLoading(false);
      } catch (err) {
        console.error('Failed to load topics:', err);
        setError('Failed to load topics. Please try again later.');
        setLoading(false);
      }
    };

    fetchTopics();
  }, []);

console.log('Rendering with topics:', topics, 'Loading:', loading);
  return (
    <ChildLayout>
      <div className="child-dashboard">
        <h1>Choose a Topic to Learn</h1>
        <div className="topics-grid">
          {topics.map((topic) => (
            <div
              key={topic.id}
              className="topic-card"
              onClick={() => navigate(`/child/topic/${topic.id}`)}
              style={{ cursor: 'pointer' }}
            >
              <div className="topic-icon">{topic.icon}</div>
              <h3>{topic.name}</h3>
              <p>{topic.description}</p>
              <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: `${topic.progress || 0}%` }}></div>
              </div>
              <span className="progress-text">{topic.progress || 0}% Complete</span>
            </div>
          ))}
        </div>
      </div>
    </ChildLayout>
  );
};

export default ChildDashboard;

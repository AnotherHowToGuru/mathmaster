import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTopicById, getLessonsForTopic } from '../services/api'; // Ensure these are correctly imported
import ChildLayout from '../layouts/ChildLayout';
import LessonCard from '../components/LessonCard';
import '../LessonCard.css'; // Import the CSS for LessonCard and TopicLessons

const TopicLessons = () => {
    const { topicId } = useParams();
    const navigate = useNavigate();
    const [topic, setTopic] = useState(null);
    const [lessons, setLessons] = useState([]); // Initialize as empty array
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // Initialize as null

    useEffect(() => {
        const fetchTopicAndLessons = async () => {
            try {
                setLoading(true);
                setError(null); // Clear previous errors

                const topicData = await getTopicById(topicId);
                setTopic(topicData);

                const lessonsData = await getLessonsForTopic(topicId);
                // Ensure lessonsData is an array, even if API returns null/undefined
                setLessons(Array.isArray(lessonsData) ? lessonsData : []); 
                
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch topic or lessons:", err);
                setError("Failed to load content. Please try again later.");
                setLoading(false);
                setLessons([]); // Ensure lessons is an empty array on error
            }
        };

        fetchTopicAndLessons();
    }, [topicId]);

    const handleLessonClick = (lessonId) => {
        navigate(`/child/lesson/${lessonId}`);
    };

    if (loading) {
        return (
            <ChildLayout>
                <div className="topic-lessons-container loading">
                    <div className="loading-spinner"></div>
                    <p className="loading-text">Loading topic and lessons...</p>
                </div>
            </ChildLayout>
        );
    }

    if (error) {
        return (
            <ChildLayout>
                <div className="topic-lessons-container error">
                    <p className="error-message">{error}</p>
                </div>
            </ChildLayout>
        );
    }

    if (!topic) {
        return (
            <ChildLayout>
                <div className="topic-lessons-container not-found">
                    <p className="not-found-message">Topic not found.</p>
                </div>
            </ChildLayout>
        );
    }

    return (
        <ChildLayout>
            <div className="topic-lessons-container">
                <div className="topic-header-section">
                    <div className="topic-icon-large">{topic.icon}</div>
                    <h1 className="topic-title">{topic.name}</h1>
                    <p className="topic-description">{topic.description}</p>
                </div>

                <h2 className="lessons-header">Choose a Lesson</h2>
                <p className="lessons-subheader">Start your learning journey!</p>

                <div className="lessons-grid">
                    {/* Safety check: Only map if lessons is an array and has items */}
                    {lessons && lessons.length > 0 ? ( 
                        lessons.map((lesson) => (
                            <LessonCard
                                key={lesson.id}
                                lesson={lesson}
                                onClick={() => handleLessonClick(lesson.id)}
                            />
                        ))
                    ) : (
                        <p className="no-lessons-message">No lessons available for this topic yet.</p>
                    )}
                </div>
            </div>
        </ChildLayout>
    );
};

export default TopicLessons;

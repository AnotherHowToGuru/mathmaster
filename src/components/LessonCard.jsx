import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faClock } from '@fortawesome/free-solid-svg-icons';

const LessonCard = ({ lesson, onClick }) => {
    if (!lesson) {
        return null; // Or a placeholder if lesson data is missing
    }

    const renderDifficulty = (difficulty) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(
                <FontAwesomeIcon
                    key={i}
                    icon={faStar}
                    className={i < difficulty ? 'difficulty-star filled' : 'difficulty-star'}
                />
            );
        }
        let difficultyText = '';
        let difficultyClass = '';
        if (difficulty === 1) {
            difficultyText = 'Easy';
            difficultyClass = 'easy';
        } else if (difficulty === 2) {
            difficultyText = 'Medium';
            difficultyClass = 'medium';
        } else if (difficulty === 3) {
            difficultyText = 'Hard';
            difficultyClass = 'hard';
        } else {
            difficultyText = 'N/A';
        }

        return (
            <div className="difficulty-rating">
                <span className={`difficulty-text ${difficultyClass}`}>{difficultyText}</span>
                <div className="difficulty-stars">{stars}</div>
            </div>
        );
    };

    return (
        <div className="lesson-card" onClick={onClick}>
            <div className="lesson-card-number">{lesson.order}</div>
            <h3 className="lesson-card-title">{lesson.title}</h3>
            <p className="lesson-card-description">{lesson.description}</p>
            <div className="lesson-card-meta">
                <span>
                    <FontAwesomeIcon icon={faClock} /> {lesson.estimated_time} mins
                </span>
                {renderDifficulty(lesson.difficulty)}
            </div>
            <button className="lesson-card-button">
                Start <FontAwesomeIcon icon={['fas', 'play']} />
            </button>
        </div>
    );
};

export default LessonCard;

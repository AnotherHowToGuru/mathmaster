import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Mascot from '../components/child/Mascot';
import './ExerciseScreen.css';

// Mock exercise data with enhanced structure
const exerciseData = {
  '1': {
    id: '1',
    title: 'Addition Practice',
    questions: [
      {
        id: 1,
        question: 'What is 3 + 5?',
        type: 'multiple_choice',
        options: ['7', '8', '9', '10'],
        correctAnswer: '8',
        hint: 'Count 3 fingers, then count 5 more fingers, and count them all together.',
        explanation: 'When we add 3 + 5, we get 8! Great job!'
      },
      {
        id: 2,
        question: 'What is 7 + 4?',
        type: 'multiple_choice', 
        options: ['9', '10', '11', '12'],
        correctAnswer: '11',
        hint: 'Think of 7 + 3 = 10, then add 1 more.',
        explanation: '7 + 4 = 11. You can think of it as 7 + 3 + 1!'
      },
      {
        id: 3,
        question: 'What is 2 + 6?',
        type: 'multiple_choice',
        options: ['7', '8', '9', '10'],
        correctAnswer: '8',
        hint: 'Count 2 fingers, then count 6 more fingers, and count them all together.',
        explanation: '2 + 6 = 8. Well done!'
      },
      {
        id: 4,
        question: 'What is 5 + 5?',
        type: 'multiple_choice',
        options: ['8', '9', '10', '11'],
        correctAnswer: '10',
        hint: '5 + 5 is a doubles fact. It equals 10.',
        explanation: '5 + 5 = 10. This is called a doubles fact!'
      },
      {
        id: 5,
        question: 'What is 4 + 3?',
        type: 'multiple_choice',
        options: ['5', '6', '7', '8'],
        correctAnswer: '7',
        hint: 'Count 4 objects, then count 3 more, and count them all together.',
        explanation: '4 + 3 = 7. Excellent work!'
      }
    ]
  },
  'numbers': {
    id: 'numbers',
    title: 'Number Facts',
    questions: [
      {
        id: 1,
        question: 'What is 6 + 2?',
        type: 'multiple_choice',
        options: ['6', '7', '8', '9'],
        correctAnswer: '8',
        hint: 'Count 6 fingers, then count 2 more fingers, and count them all together.',
        explanation: '6 + 2 = 8. Great counting!'
      },
      {
        id: 2,
        question: 'What is 10 - 3?',
        type: 'multiple_choice',
        options: ['5', '6', '7', '8'],
        correctAnswer: '7',
        hint: 'Start with 10 fingers, put down 3, and count how many are still up.',
        explanation: '10 - 3 = 7. Perfect subtraction!'
      },
      {
        id: 3,
        question: 'What is 8 + 1?',
        type: 'multiple_choice',
        options: ['7', '8', '9', '10'],
        correctAnswer: '9',
        hint: 'When you add 1 to any number, you get the next number.',
        explanation: '8 + 1 = 9. Adding 1 gives us the next number!'
      }
    ]
  }
};

const ExerciseScreen = () => {
  const { exerciseId } = useParams();
  const navigate = useNavigate();
  
  // State management
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [hearts, setHearts] = useState(3);
  const [showHint, setShowHint] = useState(false);
  const [exerciseComplete, setExerciseComplete] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  
  // Get current exercise data
  const exercise = exerciseData[exerciseId];
  const currentQuestion = exercise?.questions[currentQuestionIndex];
  const progress = exercise ? ((currentQuestionIndex + 1) / exercise.questions.length) * 100 : 0;
  
  // Mascot messages
  const mascotMessages = {
    welcome: "Let's practice some math together! You've got this! 🌟",
    correct: ["Amazing! You got it right! 🎉", "Fantastic work! Keep going! ⭐", "Perfect! You're doing great! 🚀"],
    incorrect: ["That's okay! Let's try again! 💪", "Don't worry, practice makes perfect! 🌟", "Good try! Want to see a hint? 💡"],
    hint: "Here's a helpful hint to guide you! 🔍",
    complete: "Congratulations! You completed all the questions! You're a math star! 🌟🎉"
  };
  
  const [mascotMessage, setMascotMessage] = useState(mascotMessages.welcome);
  
  // Handle answer selection
  const handleAnswerSelect = (answer) => {
    if (showFeedback) return;
    
    setSelectedAnswer(answer);
    const correct = answer === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);
    
    if (correct) {
      setScore(score + 1);
      setMascotMessage(mascotMessages.correct[Math.floor(Math.random() * mascotMessages.correct.length)]);
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 2000);
    } else {
      setHearts(Math.max(0, hearts - 1));
      setMascotMessage(mascotMessages.incorrect[Math.floor(Math.random() * mascotMessages.incorrect.length)]);
    }
  };
  
  // Handle next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < exercise.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer('');
      setShowFeedback(false);
      setShowHint(false);
      setMascotMessage("Ready for the next question? You're doing amazing! 🌟");
    } else {
      setExerciseComplete(true);
      setMascotMessage(mascotMessages.complete);
      setShowCelebration(true);
    }
  };
  
  // Handle hint
  const handleShowHint = () => {
    setShowHint(true);
    setMascotMessage(mascotMessages.hint);
  };
  
  // Handle restart
  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer('');
    setShowFeedback(false);
    setIsCorrect(false);
    setScore(0);
    setHearts(3);
    setShowHint(false);
    setExerciseComplete(false);
    setShowCelebration(false);
    setMascotMessage(mascotMessages.welcome);
  };
  
  if (!exercise) {
    return (
      <div className="exercise-screen">
        <div className="exercise-error">
          <h2>Exercise not found</h2>
          <button onClick={() => navigate(-1)} className="back-button">
            Go Back
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="exercise-screen">
      {/* Celebration Animation */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            className="celebration-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="celebration-content"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ type: "spring", duration: 0.8 }}
            >
              <div className="celebration-stars">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="celebration-star"
                    initial={{ scale: 0, y: 0 }}
                    animate={{ scale: 1, y: -50 }}
                    transition={{ delay: i * 0.1, duration: 0.6 }}
                  >
                    ⭐
                  </motion.div>
                ))}
              </div>
              <div className="celebration-text">
                {isCorrect ? "Correct!" : "Amazing!"}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Header */}
      <div className="exercise-header">
        <button 
          onClick={() => navigate(-1)} 
          className="back-button"
        >
          ← Back
        </button>
        
        <div className="exercise-info">
          <h1>{exercise.title}</h1>
          <div className="exercise-meta">
            <div className="progress-container">
              <div className="progress-bar">
                <motion.div 
                  className="progress-fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <span className="progress-text">
                {currentQuestionIndex + 1} of {exercise.questions.length}
              </span>
            </div>
            
            <div className="hearts-container">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`heart ${i < hearts ? 'filled' : 'empty'}`}
                  animate={i >= hearts ? { scale: [1, 0.8, 1] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  ❤️
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {!exerciseComplete ? (
        <>
          {/* Mascot Section */}
          <div className="mascot-section">
            <Mascot message={mascotMessage} />
          </div>
          
          {/* Question Section */}
          <motion.div 
            className="question-section"
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="question-card">
              <div className="question-number">
                Question {currentQuestionIndex + 1}
              </div>
              
              <div className="question-text">
                {currentQuestion.question}
              </div>
              
              {/* Hint Section */}
              <AnimatePresence>
                {showHint && (
                  <motion.div
                    className="hint-section"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="hint-content">
                      💡 {currentQuestion.hint}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Answer Options */}
              <div className="answer-options">
                {currentQuestion.options.map((option, index) => (
                  <motion.button
                    key={option}
                    className={`answer-option ${
                      selectedAnswer === option ? 'selected' : ''
                    } ${
                      showFeedback && option === currentQuestion.correctAnswer ? 'correct' : ''
                    } ${
                      showFeedback && selectedAnswer === option && !isCorrect ? 'incorrect' : ''
                    }`}
                    onClick={() => handleAnswerSelect(option)}
                    disabled={showFeedback}
                    whileHover={{ scale: showFeedback ? 1 : 1.05 }}
                    whileTap={{ scale: showFeedback ? 1 : 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>
              
              {/* Feedback Section */}
              <AnimatePresence>
                {showFeedback && (
                  <motion.div
                    className="feedback-section"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className={`feedback-message ${isCorrect ? 'correct' : 'incorrect'}`}>
                      {isCorrect ? '🎉 ' : '💪 '}
                      {currentQuestion.explanation}
                    </div>
                    
                    <div className="feedback-actions">
                      {!isCorrect && !showHint && (
                        <button 
                          onClick={handleShowHint}
                          className="hint-button"
                        >
                          💡 Show Hint
                        </button>
                      )}
                      
                      <button 
                        onClick={handleNextQuestion}
                        className="next-button"
                      >
                        {currentQuestionIndex < exercise.questions.length - 1 ? 'Next Question' : 'Finish'} →
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      ) : (
        /* Completion Screen */
        <motion.div 
          className="completion-screen"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="completion-content">
            <div className="completion-mascot">
              <Mascot message={mascotMessage} />
            </div>
            
            <div className="completion-stats">
              <h2>Exercise Complete! 🎉</h2>
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-number">{score}</div>
                  <div className="stat-label">Correct Answers</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">{exercise.questions.length}</div>
                  <div className="stat-label">Total Questions</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">{Math.round((score / exercise.questions.length) * 100)}%</div>
                  <div className="stat-label">Score</div>
                </div>
              </div>
            </div>
            
            <div className="completion-actions">
              <button 
                onClick={handleRestart}
                className="restart-button"
              >
                🔄 Try Again
              </button>
              <button 
                onClick={() => navigate(-1)}
                className="continue-button"
              >
                Continue Learning →
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ExerciseScreen;


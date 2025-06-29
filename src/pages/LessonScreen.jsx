import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, RotateCcw, ChevronRight, Star, Trophy, Heart } from 'lucide-react';
import Mascot from '../components/child/Mascot';
import '../LessonScreen.css';

// Mock lesson data
const lessonData = {
  numbers: {
    id: 'numbers',
    title: 'Adding Numbers to 10',
    content: [
      {
        type: 'explanation',
        text: 'When we add numbers, we are putting them together to find the total.',
        visual: '5 + 3 = 8',
        visualType: 'equation'
      },
      {
        type: 'example',
        text: 'Let\'s add 5 apples and 3 apples.',
        visual: '🍎🍎🍎🍎🍎 + 🍎🍎🍎 = 🍎🍎🍎🍎🍎🍎🍎🍎',
        visualType: 'objects'
      },
      {
        type: 'interactive',
        text: 'Now you try! How many apples are there in total?',
        visual: '5 + 3 = ?',
        visualType: 'equation',
        answer: '8'
      }
    ],
    mascotMessages: [
      'Let\'s learn about adding numbers!',
      'Great job! Adding is putting numbers together.',
      'Well done! You\'re getting good at this!'
    ]
  },
  shapes: {
    id: 'shapes',
    title: 'Learning About Shapes',
    content: [
      {
        type: 'explanation',
        text: 'Shapes are all around us. Let\'s learn about some basic shapes.',
        visual: '▲ ● ■',
        visualType: 'shapes'
      },
      {
        type: 'example',
        text: 'A triangle has 3 sides and 3 corners.',
        visual: '▲',
        visualType: 'shape'
      },
      {
        type: 'interactive',
        text: 'How many sides does a square have?',
        visual: '■',
        visualType: 'shape',
        answer: '4'
      }
    ],
    mascotMessages: [
      'Shapes are fun to learn about!',
      'Look at all these interesting shapes!',
      'You\'re doing great with shapes!'
    ]
  },
  measuring: {
    id: 'measuring',
    title: 'Measuring Length',
    content: [
      {
        type: 'explanation',
        text: 'We measure how long things are using units like centimeters.',
        visual: '📏',
        visualType: 'tool'
      },
      {
        type: 'example',
        text: 'This pencil is 10 centimeters long.',
        visual: '✏️ = 10 cm',
        visualType: 'measurement'
      },
      {
        type: 'interactive',
        text: 'If one eraser is 5 cm long, how long are two erasers?',
        visual: '5 cm + 5 cm = ?',
        visualType: 'equation',
        answer: '10 cm'
      }
    ],
    mascotMessages: [
      'Let\'s learn how to measure things!',
      'Measuring helps us know how big things are.',
      'You\'re becoming a measuring expert!'
    ]
  }
};

const LessonScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [mascotMessage, setMascotMessage] = useState('');
  const [showCelebration, setShowCelebration] = useState(false);
  const [hearts, setHearts] = useState(3);

  // Get lesson data based on ID
  const lesson = lessonData[id] || lessonData.numbers;
  const totalSteps = lesson.content.length;
  const currentContent = lesson.content[currentStep];

  useEffect(() => {
    setMascotMessage(lesson.mascotMessages[currentStep] || 'Keep going! You\'re doing great!');
  }, [currentStep, lesson.mascotMessages]);

  const handleAnswer = () => {
    if (currentContent.type === 'interactive') {
      const correct = userAnswer.toLowerCase().trim() === currentContent.answer.toLowerCase().trim();
      setIsCorrect(correct);
      
      if (correct) {
        setMascotMessage('Fantastic! That\'s exactly right! 🌟');
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 2000);
      } else {
        setMascotMessage('Not quite right. Try again! You can do it! 💪');
        setHearts(prev => Math.max(0, prev - 1));
      }
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
      setUserAnswer('');
      setIsCorrect(null);
    } else {
      // Lesson complete
      setMascotMessage('Amazing work! You\'ve completed this lesson! 🎉');
      setShowCelebration(true);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setUserAnswer('');
      setIsCorrect(null);
    }
  };

  const restart = () => {
    setCurrentStep(0);
    setUserAnswer('');
    setIsCorrect(null);
    setHearts(3);
    setMascotMessage(lesson.mascotMessages[0]);
  };

  const getVisualElement = (visual, visualType) => {
    switch (visualType) {
      case 'equation':
        return <div className="equation-display">{visual}</div>;
      case 'objects':
        return <div className="objects-display">{visual}</div>;
      case 'shapes':
        return <div className="shapes-display">{visual}</div>;
      case 'shape':
        return <div className="shape-display">{visual}</div>;
      case 'tool':
        return <div className="tool-display">{visual}</div>;
      case 'measurement':
        return <div className="measurement-display">{visual}</div>;
      default:
        return <div className="default-display">{visual}</div>;
    }
  };

  return (
    <div className="lesson-screen">
      {/* Celebration Animation */}
      {showCelebration && (
        <motion.div 
          className="celebration-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className="celebration-content"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Trophy size={64} className="celebration-icon" />
            <h2>Excellent Work!</h2>
            <div className="stars">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, rotate: 0 }}
                  animate={{ scale: 1, rotate: 360 }}
                  transition={{ delay: i * 0.2 }}
                >
                  <Star size={32} fill="gold" color="gold" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Header */}
      <div className="lesson-header">
        <button 
          className="back-button" 
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >
          <ChevronLeft size={24} />
          <span>Back</span>
        </button>
        
        <div className="lesson-title">
          <h1>{lesson.title}</h1>
        </div>
        
        <div className="lesson-controls">
          <button 
            className="restart-button"
            onClick={restart}
            aria-label="Restart lesson"
          >
            <RotateCcw size={20} />
            <span>Restart</span>
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="progress-section">
        <div className="progress-bar-container">
          <div 
            className="progress-bar"
            style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
          />
        </div>
        <div className="progress-text">
          Step {currentStep + 1} of {totalSteps}
        </div>
        
        {/* Hearts */}
        <div className="hearts-container">
          {[...Array(3)].map((_, i) => (
            <Heart 
              key={i} 
              size={24} 
              className={`heart ${i < hearts ? 'filled' : 'empty'}`}
              fill={i < hearts ? '#e53e3e' : 'none'}
              color={i < hearts ? '#e53e3e' : '#cbd5e0'}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="lesson-content">
        {/* Mascot Section */}
        <motion.div 
          className="mascot-section"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mascot-container">
            <Mascot />
            <div className="speech-bubble">
              <p>{mascotMessage}</p>
            </div>
          </div>
        </motion.div>

        {/* Content Card */}
        <motion.div 
          className="content-card"
          key={currentStep}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="content-type-badge">
            {currentContent.type === 'explanation' && '📖 Learn'}
            {currentContent.type === 'example' && '💡 Example'}
            {currentContent.type === 'interactive' && '🎯 Try It'}
          </div>
          
          <div className="content-text">
            <p>{currentContent.text}</p>
          </div>
          
          <div className="visual-section">
            {getVisualElement(currentContent.visual, currentContent.visualType)}
          </div>
          
          {/* Interactive Section */}
          {currentContent.type === 'interactive' && (
            <div className="interactive-section">
              <div className="answer-input-container">
                <input
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Type your answer here..."
                  className={`answer-input ${isCorrect === true ? 'correct' : isCorrect === false ? 'incorrect' : ''}`}
                  onKeyPress={(e) => e.key === 'Enter' && handleAnswer()}
                />
                <button 
                  className="check-button"
                  onClick={handleAnswer}
                  disabled={!userAnswer.trim()}
                >
                  Check Answer
                </button>
              </div>
              
              {isCorrect !== null && (
                <motion.div 
                  className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {isCorrect ? (
                    <div className="correct-feedback">
                      <Star size={24} fill="gold" color="gold" />
                      <span>Correct! Well done!</span>
                    </div>
                  ) : (
                    <div className="incorrect-feedback">
                      <span>Try again! You're almost there!</span>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          )}
        </motion.div>
      </div>

      {/* Navigation */}
      <div className="lesson-navigation">
        <button 
          className="nav-button prev"
          onClick={prevStep}
          disabled={currentStep === 0}
        >
          <ChevronLeft size={20} />
          <span>Previous</span>
        </button>
        
        <div className="step-indicators">
          {[...Array(totalSteps)].map((_, i) => (
            <div 
              key={i}
              className={`step-indicator ${i === currentStep ? 'active' : i < currentStep ? 'completed' : ''}`}
              onClick={() => setCurrentStep(i)}
            />
          ))}
        </div>
        
        <button 
          className="nav-button next"
          onClick={nextStep}
          disabled={currentContent.type === 'interactive' && isCorrect !== true}
        >
          <span>{currentStep === totalSteps - 1 ? 'Complete' : 'Next'}</span>
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default LessonScreen;


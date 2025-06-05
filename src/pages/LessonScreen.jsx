import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, RotateCcw, ChevronRight } from 'lucide-react';
import Mascot from '../components/child/Mascot';

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
        visual: '🔺⬜⭕',
        visualType: 'shapes'
      },
      {
        type: 'example',
        text: 'A triangle has 3 sides and 3 corners.',
        visual: '🔺',
        visualType: 'shape'
      },
      {
        type: 'interactive',
        text: 'How many sides does a square have?',
        visual: '⬜',
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
  
  // Get lesson data based on ID
  const lesson = lessonData[id] || lessonData.numbers;
  const totalSteps = lesson.content.length;
  const currentContent = lesson.content[currentStep];
  
  // Set initial mascot message
  useEffect(() => {
    setMascotMessage(lesson.mascotMessages[0]);
  }, [lesson]);
  
  // Handle next step
  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
      setMascotMessage(lesson.mascotMessages[currentStep + 1]);
      setIsCorrect(null);
      setUserAnswer('');
    } else {
      // Navigate to exercise when lesson is complete
      navigate(`/child/exercise/${id}`);
    }
  };
  
  // Handle previous step
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setMascotMessage(lesson.mascotMessages[currentStep - 1]);
      setIsCorrect(null);
      setUserAnswer('');
    }
  };
  
  // Handle restart
  const handleRestart = () => {
    setCurrentStep(0);
    setMascotMessage(lesson.mascotMessages[0]);
    setIsCorrect(null);
    setUserAnswer('');
  };
  
  // Handle answer submission
  const handleAnswerSubmit = () => {
    if (currentContent.type === 'interactive') {
      const correct = userAnswer === currentContent.answer;
      setIsCorrect(correct);
      
      if (correct) {
        setMascotMessage('Well done! That\'s correct!');
        setTimeout(handleNext, 1500);
      } else {
        setMascotMessage('Try again! You can do it!');
      }
    }
  };
  
  return (
    <div className="pb-16">
      {/* Progress bar */}
      <div className="mm-progress-bar mb-4">
        <div 
          className="mm-progress-fill" 
          style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
        ></div>
      </div>
      
      <motion.div 
        className="mm-card bg-yellow-100 mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        key={currentStep}
      >
        <h2 className="text-2xl font-bold mb-6">{lesson.title}</h2>
        
        {/* Lesson content */}
        <div className="mb-8">
          <p className="text-lg mb-4">{currentContent.text}</p>
          
          {/* Visual representation */}
          <div className="bg-white rounded-xl p-6 mb-4 text-center">
            {currentContent.visualType === 'equation' ? (
              <div className="text-4xl font-bold">{currentContent.visual}</div>
            ) : currentContent.visualType === 'objects' ? (
              <div className="text-4xl">{currentContent.visual}</div>
            ) : (
              <div className="text-6xl">{currentContent.visual}</div>
            )}
          </div>
          
          {/* Interactive elements */}
          {currentContent.type === 'interactive' && (
            <div className="mt-6">
              <input
                type="text"
                className="w-full p-4 text-xl border-2 border-primary rounded-xl mb-4"
                placeholder="Your answer..."
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAnswerSubmit()}
              />
              <button 
                className="mm-button mm-button-primary w-full"
                onClick={handleAnswerSubmit}
              >
                Check Answer
              </button>
              
              {isCorrect !== null && (
                <div className={`mt-4 p-4 rounded-xl ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {isCorrect ? 'Correct! Well done!' : 'Not quite right. Try again!'}
                </div>
              )}
            </div>
          )}
        </div>
        
        <Mascot 
          position="bottom-right" 
          message={mascotMessage} 
          mood={isCorrect === true ? 'excited' : isCorrect === false ? 'thinking' : 'happy'}
        />
        
        {/* Navigation buttons */}
        <div className="flex justify-between mt-8">
          <button 
            className="mm-button bg-sky-200 text-primary flex items-center"
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            <ChevronLeft className="mr-2" />
            Back
          </button>
          
          <button 
            className="mm-button bg-sky-200 text-primary flex items-center"
            onClick={handleRestart}
          >
            <RotateCcw className="mr-2" size={18} />
            Restart
          </button>
          
          {currentContent.type !== 'interactive' && (
            <button 
              className="mm-button mm-button-primary flex items-center"
              onClick={handleNext}
            >
              Next
              <ChevronRight className="ml-2" />
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default LessonScreen;


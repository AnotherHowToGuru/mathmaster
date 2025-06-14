import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lightbulb } from 'lucide-react';
import Mascot from '../components/child/Mascot';
import '../ExerciseScreen.css'; // Add this line near the other imports


// Mock exercise data
const exerciseData = {
  '1': {
    id: '1',
    title: 'Addition Practice',
    questions: [
      {
        id: 1,
        question: 'What is 3 + 5?',
        options: ['7', '8', '9', '10'],
        correctAnswer: '8',
        hint: 'Count 3 fingers, then count 5 more fingers, and count them all together.'
      },
      {
        id: 2,
        question: 'What is 7 + 4?',
        options: ['9', '10', '11', '12'],
        correctAnswer: '11',
        hint: 'Think of 7 + 3 = 10, then add 1 more.'
      },
      {
        id: 3,
        question: 'What is 2 + 6?',
        options: ['7', '8', '9', '10'],
        correctAnswer: '8',
        hint: 'Count 2 fingers, then count 6 more fingers, and count them all together.'
      },
      {
        id: 4,
        question: 'What is 5 + 5?',
        options: ['8', '9', '10', '11'],
        correctAnswer: '10',
        hint: '5 + 5 is a doubles fact. It equals 10.'
      },
      {
        id: 5,
        question: 'What is 4 + 3?',
        options: ['5', '6', '7', '8'],
        correctAnswer: '7',
        hint: 'Count 4 objects, then count 3 more, and count them all together.'
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
        options: ['6', '7', '8', '9'],
        correctAnswer: '8',
        hint: 'Count 6 fingers, then count 2 more fingers, and count them all together.'
      },
      {
        id: 2,
        question: 'What is 10 - 3?',
        options: ['5', '6', '7', '8'],
        correctAnswer: '7',
        hint: 'Start with 10 fingers, put down 3, and count how many are still up.'
      },
      {
        id: 3,
        question: 'What is 4 + 4?',
        options: ['6', '7', '8', '9'],
        correctAnswer: '8',
        hint: '4 + 4 is a doubles fact. It\'s the same as 2 groups of 4.'
      }
    ]
  },
  'shapes': {
    id: 'shapes',
    title: 'Shape Recognition',
    questions: [
      {
        id: 1,
        question: 'How many sides does a triangle have?',
        options: ['2', '3', '4', '5'],
        correctAnswer: '3',
        hint: 'Count the straight lines that make up a triangle.'
      },
      {
        id: 2,
        question: 'Which shape has 4 equal sides?',
        options: ['Rectangle', 'Square', 'Triangle', 'Circle'],
        correctAnswer: 'Square',
        hint: 'A square has 4 sides that are all the same length.'
      }
    ]
  },
  'measuring': {
    id: 'measuring',
    title: 'Measurement Practice',
    questions: [
      {
        id: 1,
        question: 'Which is longer: 10 cm or 5 cm?',
        options: ['10 cm', '5 cm', 'They are equal', 'Cannot tell'],
        correctAnswer: '10 cm',
        hint: 'The bigger the number, the longer the measurement.'
      },
      {
        id: 2,
        question: 'If a pencil is 15 cm long and a crayon is 8 cm long, how much longer is the pencil?',
        options: ['5 cm', '6 cm', '7 cm', '8 cm'],
        correctAnswer: '7 cm',
        hint: 'Subtract the smaller number from the bigger number: 15 - 8 = ?'
      }
    ]
  },
  'challenge': {
    id: 'challenge',
    title: 'Today\'s Challenge',
    questions: [
      {
        id: 1,
        question: 'If you have 8 sweets and eat 3, how many do you have left?',
        options: ['3', '4', '5', '6'],
        correctAnswer: '5',
        hint: 'Start with 8 and take away 3.'
      },
      {
        id: 2,
        question: 'What is double 6?',
        options: ['10', '11', '12', '13'],
        correctAnswer: '12',
        hint: 'Double means two times: 6 + 6 = ?'
      }
    ]
  }
};

const ExerciseScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState(0);
  const [mascotMessage, setMascotMessage] = useState('');
  
  // Get exercise data based on ID
  const exercise = exerciseData[id] || exerciseData['1'];
  const questions = exercise.questions;
  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  
  // Set initial mascot message
  useEffect(() => {
    setMascotMessage('Choose the correct answer!');
  }, []);
  
  // Handle answer selection
  const handleAnswerSelect = (answer) => {
    if (isCorrect !== null) return; // Prevent changing answer after submission
    
    setSelectedAnswer(answer);
    const correct = answer === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    
    if (correct) {
      setScore(score + 1);
      setMascotMessage('Great job! That\'s correct!');
      
      // Move to next question after a delay
      setTimeout(() => {
        if (currentQuestionIndex < totalQuestions - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setSelectedAnswer(null);
          setIsCorrect(null);
          setShowHint(false);
          setMascotMessage('Choose the correct answer!');
        } else {
          // Exercise complete
          setMascotMessage(`You scored ${score + 1} out of ${totalQuestions}!`);
          
          // Navigate back to dashboard after a delay
          setTimeout(() => {
            navigate('/child');
          }, 3000);
        }
      }, 1500);
    } else {
      setMascotMessage('Not quite right. Try again or use a hint!');
    }
  };
  
  // Handle hint toggle
  const handleHintToggle = () => {
    setShowHint(!showHint);
    if (!showHint) {
      setMascotMessage(currentQuestion.hint);
    } else {
      setMascotMessage('Choose the correct answer!');
    }
  };
  
  return (
    <div className="pb-16">
      <motion.div 
        className="mm-card bg-sky-100 mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        key={currentQuestionIndex}
      >
        {/* Progress indicator */}
        <div className="bg-primary text-white px-4 py-2 rounded-full inline-block mb-4">
          {currentQuestionIndex + 1} / {totalQuestions}
        </div>
        
        {/* Question */}
        <h2 className="text-2xl font-bold mb-8">{currentQuestion.question}</h2>
        
        {/* Answer options */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {currentQuestion.options.map((option, index) => (
            <motion.button
              key={index}
              className={`mm-button p-6 text-2xl font-bold ${
                selectedAnswer === option
                  ? isCorrect
                    ? 'bg-green-400 text-white'
                    : 'bg-red-400 text-white'
                  : `bg-${['yellow-400', 'teal-400', 'orange-400', 'green-400'][index]} text-white`
              }`}
              whileHover={{ scale: selectedAnswer === null ? 1.05 : 1 }}
              whileTap={{ scale: selectedAnswer === null ? 0.95 : 1 }}
              onClick={() => selectedAnswer === null && handleAnswerSelect(option)}
            >
              {option}
            </motion.button>
          ))}
        </div>
        
        {/* Hint button */}
        <button
          className={`flex items-center px-4 py-2 rounded-full ${
            showHint ? 'bg-yellow-400 text-black' : 'bg-yellow-200 text-yellow-800'
          }`}
          onClick={handleHintToggle}
        >
          <Lightbulb className="mr-2" size={18} />
          {showHint ? 'Hide Hint' : 'Show Hint'}
        </button>
        
        {/* Hint content */}
        {showHint && (
          <motion.div 
            className="mt-4 p-4 bg-yellow-100 rounded-xl"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
          >
            <p>{currentQuestion.hint}</p>
          </motion.div>
        )}
        
        <Mascot 
          position="bottom-right" 
          message={mascotMessage} 
          mood={isCorrect === true ? 'excited' : isCorrect === false ? 'thinking' : 'happy'}
        />
      </motion.div>
    </div>
  );
};

export default ExerciseScreen;


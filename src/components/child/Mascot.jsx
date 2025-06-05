import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * Owl mascot component that provides guidance and encouragement
 * 
 * @param {Object} props
 * @param {string} props.position - Position of the mascot ('top-right', 'bottom-right', etc.)
 * @param {string} props.message - Message to display in the speech bubble
 * @param {string} props.mood - Mood of the mascot ('happy', 'thinking', 'excited', 'default')
 * @param {boolean} props.animate - Whether to animate the mascot
 */
const Mascot = ({ 
  position = 'bottom-right', 
  message = '', 
  mood = 'default',
  animate = true 
}) => {
  const [showMessage, setShowMessage] = useState(!!message);
  
  // Position classes
  const positionClasses = {
    'top-right': 'mm-mascot-top-right',
    'bottom-right': 'mm-mascot-bottom-right',
    'top-left': 'top-4 left-4',
    'bottom-left': 'bottom-4 left-4',
  };
  
  // Mood expressions
  const moodExpressions = {
    happy: '😊',
    thinking: '🤔',
    excited: '😃',
    default: '🙂',
  };
  
  // Animation variants
  const mascotVariants = {
    idle: {
      y: [0, -5, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: 'reverse',
      },
    },
    static: {
      y: 0,
    },
  };
  
  // Toggle message visibility when clicked
  const handleClick = () => {
    setShowMessage(!showMessage);
  };
  
  // Auto-hide message after 5 seconds if one is provided
  useEffect(() => {
    if (message && showMessage) {
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [message, showMessage]);
  
  return (
    <div className={`mm-mascot ${positionClasses[position]}`}>
      {showMessage && message && (
        <motion.div 
          className="mm-speech-bubble mm-speech-bubble-right mb-2 max-w-xs"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
        >
          {message}
        </motion.div>
      )}
      
      <motion.div 
        className="cursor-pointer"
        onClick={handleClick}
        variants={mascotVariants}
        animate={animate ? 'idle' : 'static'}
      >
        <div className="w-20 h-20 bg-amber-500 rounded-full flex items-center justify-center relative">
          {/* Owl face */}
          <div className="absolute top-3 left-3 w-6 h-6 bg-white rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-black rounded-full"></div>
          </div>
          <div className="absolute top-3 right-3 w-6 h-6 bg-white rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-black rounded-full"></div>
          </div>
          
          {/* Beak */}
          <div className="absolute bottom-5 w-4 h-4 bg-orange-600 rounded-sm"></div>
          
          {/* Expression */}
          <div className="absolute -bottom-2 text-2xl">
            {moodExpressions[mood]}
          </div>
          
          {/* Glasses */}
          <div className="absolute top-3 w-16 h-6 border-2 border-blue-500 rounded-full"></div>
          <div className="absolute top-3 left-1/2 h-6 w-1 bg-blue-500"></div>
        </div>
      </motion.div>
    </div>
  );
};

export default Mascot;


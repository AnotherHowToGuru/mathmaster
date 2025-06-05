import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Mascot from '../components/child/Mascot';

// Mock data for topics
const topics = [
  { 
    id: 'numbers', 
    title: 'Numbers', 
    icon: '123', 
    color: 'bg-yellow-400',
    progress: 65 
  },
  { 
    id: 'shapes', 
    title: 'Shapes', 
    icon: '🔺🟦⭕', 
    color: 'bg-green-400',
    progress: 80 
  },
  { 
    id: 'measuring', 
    title: 'Measuring', 
    icon: '📏', 
    color: 'bg-sky-400',
    progress: 40 
  },
  { 
    id: 'games', 
    title: 'Games', 
    icon: '🎮', 
    color: 'bg-purple-400',
    progress: 75 
  }
];

// Mock data for achievements
const achievements = [
  { id: 'star', icon: '⭐' },
  { id: 'apple', icon: '🍎' },
  { id: 'medal', icon: '🥇' },
  { id: 'trophy', icon: '🏆' }
];

const ChildDashboard = () => {
  const navigate = useNavigate();
  
  // Handle topic selection
  const handleTopicClick = (topicId) => {
    if (topicId === 'games') {
      navigate('/child/exercise/1');
    } else {
      navigate(`/child/lesson/${topicId}`);
    }
  };
  
  // Handle challenge click
  const handleChallengeClick = () => {
    navigate('/child/exercise/challenge');
  };
  
  // Handle achievements click
  const handleAchievementsClick = () => {
    navigate('/child/achievements');
  };
  
  return (
    <div className="pb-16">
      <Mascot 
        position="top-right" 
        message="Hello! What shall we learn today?" 
        mood="happy"
      />
      
      <motion.h1 
        className="text-3xl font-bold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Dashboard
      </motion.h1>
      
      {/* Topics grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {topics.map((topic, index) => (
          <TopicCard 
            key={topic.id}
            topic={topic}
            onClick={() => handleTopicClick(topic.id)}
            delay={index * 0.1}
          />
        ))}
      </div>
      
      {/* Challenge and achievements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div
          className="mm-card bg-yellow-400 cursor-pointer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          onClick={handleChallengeClick}
        >
          <div className="flex items-center">
            <div className="text-4xl mr-4">⭐</div>
            <h3 className="text-xl font-bold">Today's Challenge</h3>
          </div>
        </motion.div>
        
        <motion.div
          className="mm-card bg-sky-100 cursor-pointer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          onClick={handleAchievementsClick}
        >
          <h3 className="text-xl font-bold mb-2">My Achievements</h3>
          <div className="flex space-x-2">
            {achievements.map(achievement => (
              <div 
                key={achievement.id}
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-xl"
              >
                {achievement.icon}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Topic card component
const TopicCard = ({ topic, onClick, delay = 0 }) => {
  return (
    <motion.div
      className={`mm-topic-card ${topic.color}`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      onClick={onClick}
    >
      <div className="flex flex-col h-full">
        <div className="text-4xl mb-2">{topic.icon}</div>
        <h3 className="text-xl font-bold mb-4">{topic.title}</h3>
        <div className="mt-auto">
          <div className="mm-progress-bar">
            <div 
              className="mm-progress-fill" 
              style={{ width: `${topic.progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ChildDashboard;


import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import Mascot from '../components/child/Mascot';

// Mock achievements data
const achievements = [
  {
    id: 'number-master',
    title: 'Number Master',
    description: 'Complete all number lessons',
    icon: '⭐',
    color: 'bg-yellow-400',
    unlocked: true
  },
  {
    id: 'shape-explorer',
    title: 'Shape Explorer',
    description: 'Learn about all basic shapes',
    icon: '🔺',
    color: 'bg-teal-400',
    unlocked: true
  },
  {
    id: 'addition-hero',
    title: 'Addition Hero',
    description: 'Get 10 addition questions correct in a row',
    icon: '➕',
    color: 'bg-orange-400',
    unlocked: true
  },
  {
    id: 'subtraction-star',
    title: 'Subtraction Star',
    description: 'Get 10 subtraction questions correct in a row',
    icon: '➖',
    color: 'bg-purple-400',
    unlocked: false
  },
  {
    id: 'measurement-master',
    title: 'Measurement Master',
    description: 'Complete all measurement lessons',
    icon: '📏',
    color: 'bg-blue-400',
    unlocked: false
  },
  {
    id: 'math-champion',
    title: 'Math Champion',
    description: 'Complete 50 exercises correctly',
    icon: '🏆',
    color: 'bg-red-400',
    unlocked: false
  }
];

// Mock trophies data
const trophies = [
  {
    id: 'gold-cup',
    title: 'Gold Cup',
    description: 'Complete 5 daily challenges in a row',
    icon: '🏆',
    color: 'bg-yellow-400',
    unlocked: true
  }
];

// Mock user level data
const userLevel = {
  current: 3,
  next: 4,
  progress: 65
};

const AchievementsScreen = () => {
  return (
    <div className="pb-16">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-center mb-2">My Achievements</h1>
        
        {/* Level progress */}
        <div className="mb-8">
          <div className="flex justify-between text-lg font-bold mb-2">
            <span>LEVEL {userLevel.current}</span>
            <span>LEVEL {userLevel.next}</span>
          </div>
          <div className="mm-progress-bar">
            <div 
              className="mm-progress-fill" 
              style={{ width: `${userLevel.progress}%` }}
            ></div>
          </div>
        </div>
        
        {/* Achievements grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {achievements.map((achievement, index) => (
            <AchievementCard 
              key={achievement.id}
              achievement={achievement}
              delay={index * 0.1}
            />
          ))}
        </div>
        
        {/* Trophies section */}
        <motion.div
          className="mm-card bg-blue-500 text-white mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-4">MY TROPHIES</h2>
          <div className="grid grid-cols-2 gap-4">
            {trophies.map(trophy => (
              <div 
                key={trophy.id}
                className="bg-teal-400 rounded-xl p-4 flex items-center"
              >
                <div className="text-4xl mr-4">{trophy.icon}</div>
                <div>
                  <h3 className="font-bold">{trophy.title}</h3>
                  <p className="text-sm">{trophy.description}</p>
                </div>
              </div>
            ))}
            <div className="bg-blue-400 rounded-xl p-4 flex items-center opacity-50">
              <div className="text-4xl mr-4">🥇</div>
              <div>
                <h3 className="font-bold">Coming Soon</h3>
                <p className="text-sm">Keep practicing to unlock!</p>
              </div>
            </div>
          </div>
        </motion.div>
        
        <Mascot 
          position="bottom-right" 
          message="Look at all your achievements! Keep up the great work!" 
          mood="excited"
        />
      </motion.div>
    </div>
  );
};

// Achievement card component
const AchievementCard = ({ achievement, delay = 0 }) => {
  return (
    <motion.div
      className={`rounded-xl p-4 ${achievement.unlocked ? achievement.color : 'bg-gray-400'} relative overflow-hidden`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="text-center">
        <div className="text-4xl mb-2">{achievement.icon}</div>
        <h3 className="font-bold text-sm">{achievement.title}</h3>
        
        {!achievement.unlocked && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <Lock size={24} className="text-white" />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AchievementsScreen;


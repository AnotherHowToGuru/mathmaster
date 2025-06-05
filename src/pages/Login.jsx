import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Mascot from '../components/child/Mascot';

// Avatar data
const avatars = [
  { id: 'fox', name: 'Fox', color: 'bg-orange-400' },
  { id: 'frog', name: 'Frog', color: 'bg-green-400' },
  { id: 'cat', name: 'Cat', color: 'bg-gray-400' },
  { id: 'bear', name: 'Bear', color: 'bg-amber-600' },
];

const Login = () => {
  const navigate = useNavigate();
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  
  // Handle child avatar selection
  const handleAvatarClick = (avatarId) => {
    setSelectedAvatar(avatarId);
    // In a real app, we would authenticate here
    // For now, just navigate to the child dashboard
    setTimeout(() => {
      navigate('/child');
    }, 500);
  };
  
  // Handle parent login
  const handleParentLogin = () => {
    // In a real app, we would show a login form
    // For now, just navigate to the parent dashboard
    navigate('/parent');
  };
  
  return (
    <div className="min-h-screen bg-sky-100 flex items-center justify-center p-4">
      <motion.div 
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-white rounded-3xl overflow-hidden shadow-xl">
          {/* Header */}
          <div className="bg-primary p-6 text-center">
            <h1 className="text-4xl font-bold text-white">MathMaster</h1>
          </div>
          
          {/* Content */}
          <div className="p-6 bg-cream-50">
            <Mascot 
              position="top-right" 
              message="Welcome! Choose your account to start learning." 
              mood="happy"
            />
            
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
              Choose your account
            </h2>
            
            {/* Avatar grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {avatars.map((avatar) => (
                <motion.div
                  key={avatar.id}
                  className={`mm-avatar-container ${avatar.color} aspect-square flex items-center justify-center`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAvatarClick(avatar.id)}
                >
                  <div className="text-center">
                    {/* In a real app, we would use actual avatar images */}
                    <div className="text-6xl">{getAvatarEmoji(avatar.id)}</div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Parent login button */}
            <div className="text-center">
              <motion.button
                className="mm-button mm-button-secondary w-full"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleParentLogin}
              >
                Parent Login
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Helper function to get emoji for avatar
function getAvatarEmoji(avatarId) {
  switch (avatarId) {
    case 'fox':
      return '🦊';
    case 'frog':
      return '🐸';
    case 'cat':
      return '🐱';
    case 'bear':
      return '🐻';
    default:
      return '😊';
  }
}

export default Login;


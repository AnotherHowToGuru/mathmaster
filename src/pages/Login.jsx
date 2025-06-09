import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [userType, setUserType] = useState('');
  const [selectedChild, setSelectedChild] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (userType === 'child') {
      navigate('/child');
    } else if (userType === 'parent') {
      navigate('/parent');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo-section">
          <h1>🦉 MathMaster</h1>
          <p>Learn Math the Fun Way!</p>
        </div>
        
        <div className="login-form">
          <h2>Who's Learning Today?</h2>
          
          <div className="user-type-selection">
            <button 
              className={`user-type-btn ${userType === 'child' ? 'active' : ''}`}
              onClick={() => setUserType('child')}
            >
              👦 I'm a Child
            </button>
            <button 
              className={`user-type-btn ${userType === 'parent' ? 'active' : ''}`}
              onClick={() => setUserType('parent')}
            >
              👨‍👩‍👧‍👦 I'm a Parent
            </button>
          </div>

          {userType === 'child' && (
            <div className="child-selection">
              <h3>Choose Your Profile</h3>
              <div className="child-profiles">
                <button 
                  className={`child-profile ${selectedChild === 'emma' ? 'active' : ''}`}
                  onClick={() => setSelectedChild('emma')}
                >
                  👧 Emma (Age 7)
                </button>
                <button 
                  className={`child-profile ${selectedChild === 'james' ? 'active' : ''}`}
                  onClick={() => setSelectedChild('james')}
                >
                  👦 James (Age 9)
                </button>
              </div>
            </div>
          )}

          {userType && (userType === 'parent' || selectedChild) && (
            <button className="login-btn" onClick={handleLogin}>
              Start Learning! 🚀
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;

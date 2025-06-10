import { useState, useEffect } from 'react';

const Mascot = () => {
  const [message, setMessage] = useState("Hi there! I'm Fox, your math buddy!");
  
  const messages = [
    "Hi there! I'm Fox, your math buddy!",
    "Let's learn some math together!",
    "You're doing great! Keep it up!",
    "Math is fun when we learn together!",
    "Ready for your next adventure?"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setMessage(messages[Math.floor(Math.random() * messages.length)]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mascot">
      <div className="mascot-character">🦊</div>
      <div className="mascot-message">
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Mascot;

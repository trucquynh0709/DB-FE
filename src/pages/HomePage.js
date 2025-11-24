import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomePage.css';

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  // Hiệu ứng hiện hero khi load trang
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleStart = () => {
    navigate('/login');
  };

 
  return (
    <div className="homepage">
      <div className="hero-container">
        <div className="container">
          {/* Content Section */}
          <div className={`content ${isVisible ? 'visible' : ''}`}>
           HomePage
          </div>

        </div>
     </div>
    </div>
  );
}
import React, { useState } from 'react';
import './App.css';
import EmailSubscription from './components/EmailSubscription';
import HeroSection from './components/HeroSection';
import BrandSection from './components/BrandSection';

function App() {
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscriptionSuccess = () => {
    setIsSubscribed(true);
  };

  return (
    <div className="App">
      <HeroSection />
      <BrandSection />
      <EmailSubscription onSubscriptionSuccess={handleSubscriptionSuccess} />
      
      {isSubscribed && (
        <div className="subscription-success">
          <div className="success-content">
            <h2>Welcome to the Club! 🥊</h2>
            <p>You're now on our exclusive waiting list. We'll notify you as soon as we launch!</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

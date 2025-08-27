import React, { useState } from 'react';
import './App.css';
import Navigation from './components/Navigation';
import EmailSubscription from './components/EmailSubscription';
import HeroSection from './components/HeroSection';
import ApparelSection from './components/ApparelSection';
import BrandSection from './components/BrandSection';
import CommunitySection from './components/CommunitySection';

function App() {
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscriptionSuccess = () => {
    setIsSubscribed(true);
  };

  return (
    <div className="App">
      <Navigation />
      <HeroSection />
      <ApparelSection />
      <BrandSection />
      <EmailSubscription onSubscriptionSuccess={handleSubscriptionSuccess} />
      <CommunitySection />
    </div>
  );
}

export default App;

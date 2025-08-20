import React from 'react';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-background">
        <img 
          src="/images/iamdreameng_Photograph_with_motion_blur_of_the_silhouette_of_a__a03d1f76-a130-4e52-862b-3387a6c411b9.png" 
          alt="Combat sports silhouette with motion blur" 
          className="hero-bg-image"
        />
        <div className="hero-overlay"></div>
      </div>
      
      <div className="hero-content">
        <div className="logo-container">
          <img 
            src="/images/untamedCLUB_logo.png" 
            alt="Untamed Club Logo" 
            className="hero-logo"
          />
        </div>
        
        <h1 className="hero-title">
          <span className="title-line">COMING</span>
          <span className="title-line">SOON</span>
        </h1>
        
        <p className="hero-subtitle">
          The future of combat sports & streetwear
        </p>
        
        <div className="hero-cta">
          <p>Join the waiting list for exclusive early access</p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

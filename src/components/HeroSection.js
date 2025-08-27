import React from 'react';
import './HeroSection.css';

const HeroSection = () => {
  const handleScrollDown = () => {
    const apparelSection = document.querySelector('.apparel-section');
    if (apparelSection) {
      apparelSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-section" id="coming-soon">
      <div className="hero-content">
        <div className="logo-container">
          <img 
            src="/images/untmdpantalla01.png" 
            alt="Untamed Club Logo" 
            className="main-logo"
          />
          
          {/* Scroll indicator positioned at center-bottom of logo */}
          <div className="scroll-indicator" onClick={handleScrollDown}>
            <span className="scroll-text">Scroll Down</span>
            <div className="scroll-arrow"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

import React from 'react';
import './Navigation.css';

const Navigation = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-logo">
          <img 
            src="/images/untamedCLUB_logo.svg" 
            alt="Untamed Club Logo" 
            className="logo-image"
            onClick={scrollToTop}
          />
        </div>
        <div className="nav-buttons">
          <button 
            onClick={() => scrollToSection('apparel')}
            className="nav-btn"
          >
            Apparel
          </button>
          <button 
            onClick={() => scrollToSection('about-untamed')}
            className="nav-btn"
          >
            About Us
          </button>
          <button 
            onClick={() => scrollToSection('newsletter-waitlist')}
            className="nav-btn"
          >
            Waitlist & Newsletter
          </button>
          <button 
            onClick={() => scrollToSection('community')}
            className="nav-btn"
          >
            Community & Socials
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

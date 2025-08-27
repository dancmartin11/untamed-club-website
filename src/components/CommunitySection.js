import React, { useEffect, useRef } from 'react';
import './CommunitySection.css';

const CommunitySection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const title = entry.target.querySelector('h2');
          const description = entry.target.querySelector('p');
          const links = entry.target.querySelector('.community-links');
          
          if (title) title.classList.add('animate');
          if (description) description.classList.add('animate');
          if (links) links.classList.add('animate');
        }
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section className="community-section" ref={sectionRef} id="community">
      <div className="community-content">
        <h2>Join our community!</h2>
        <p>
          Connect with fellow combat sports enthusiasts and streetwear lovers. 
          Stay updated with exclusive content, behind-the-scenes, and more.
        </p>
        
        <div className="community-links">
          <a 
            href="https://www.instagram.com/untamedclub.mx/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="community-link instagram"
          >
            <img 
              src="/images/instagram_logo.png" 
              alt="Instagram" 
              className="community-logo"
            />
            <span className="community-text">@untamedclubmx</span>
          </a>
          
          <a 
            href="https://discord.gg/JG7PGzNm" 
            target="_blank" 
            rel="noopener noreferrer"
            className="community-link discord"
          >
            <img 
              src="/images/discord_logo.svg" 
              alt="Discord" 
              className="community-logo"
            />
            <span className="community-text">Join our Discord</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;

import React, { useEffect, useRef } from 'react';
import './BrandSection.css';

const BrandSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const title = entry.target.querySelector('h2');
          const description = entry.target.querySelector('p');
          const features = entry.target.querySelectorAll('.feature');
          
          if (title) title.classList.add('animate');
          if (description) description.classList.add('animate');
          features.forEach(feature => feature.classList.add('animate'));
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
    <section className="brand-section" ref={sectionRef} id="about-untamed">
      <div className="brand-content">
        <h2>About Us</h2>
        <p>
          Born from the raw energy of combat sports and the rebellious spirit of streetwear culture, 
          Untamed Club represents the unapologetic fusion of power, style, and authenticity.
        </p>
        
        <div className="brand-features">
          <div className="feature">
            <h3>🥊 Combat Heritage</h3>
            <p>Inspired by the discipline, respect, and raw power of martial arts and combat sports.</p>
          </div>
          
          <div className="feature">
            <h3>👕 Streetwear Culture</h3>
            <p>Urban style meets athletic performance in every piece we create.</p>
          </div>
          
          <div className="feature">
            <h3>🔥 Untamed Spirit</h3>
            <p>Breaking boundaries and embracing the wild, unfiltered essence of true warriors.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandSection;

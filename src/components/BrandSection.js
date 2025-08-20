import React from 'react';
import './BrandSection.css';

const BrandSection = () => {
  return (
    <section className="brand-section">
      <div className="brand-grid">
        <div className="brand-item">
          <img 
            src="/images/danmichaels_Black-and-white_photograph_of_two_men_fighting_in_a_0832df1c-451d-49b1-af5e-05f5fe545949.png" 
            alt="Black and white photograph of two men fighting" 
            className="brand-image"
          />
        </div>
        
        <div className="brand-item">
          <img 
            src="/images/memovaras1_blurred_silhouette_of_tow_boxer_fighting_each_other__b7a600af-b334-47f3-832f-c9602d2decef.png" 
            alt="Blurred silhouette of two boxers fighting" 
            className="brand-image"
          />
        </div>
        
        <div className="brand-item">
          <img 
            src="/images/untmdpantalla01.png" 
            alt="Untamed Club brand image" 
            className="brand-image"
          />
        </div>
      </div>
      
      <div className="brand-message">
        <h2>Raw. Unfiltered. Untamed.</h2>
        <p>Where combat sports meet street culture</p>
      </div>
    </section>
  );
};

export default BrandSection;

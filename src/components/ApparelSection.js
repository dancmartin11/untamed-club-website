import React, { useEffect, useRef, useState } from 'react';
import './ApparelSection.css';

const ApparelSection = () => {
  const sectionRef = useRef(null);
  const [expandedImage, setExpandedImage] = useState(null);
  const [currentImages, setCurrentImages] = useState([0, 0, 0]); // Track current image for each block

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const title = entry.target.querySelector('h2');
          const subtitle = entry.target.querySelector('h3');
          const description = entry.target.querySelector('p');
          const images = entry.target.querySelector('.apparel-images');
          
          if (title) title.classList.add('animate');
          if (subtitle) subtitle.classList.add('animate');
          if (description) description.classList.add('animate');
          if (images) images.classList.add('animate');
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

  const handleImageClick = (imageIndex) => {
    setExpandedImage(imageIndex);
  };

  const closeExpandedImage = () => {
    setExpandedImage(null);
  };

  const navigateImage = (blockIndex, direction, e) => {
    e.stopPropagation();
    const newImages = [...currentImages];
    const productImages = getProductImages(blockIndex);
    
    if (direction === 'next') {
      newImages[blockIndex] = (newImages[blockIndex] + 1) % productImages.length;
    } else {
      newImages[blockIndex] = newImages[blockIndex] === 0 ? productImages.length - 1 : newImages[blockIndex] - 1;
    }
    
    setCurrentImages(newImages);
  };

  const getProductData = (index) => {
    const products = [
      {
        title: "UNTMD Mastery Tee | Premium Lightweight",
        price: "$499 MXN",
        images: [
          "/images/untamed_mastery_shirt_back.jpg",
          "/images/untamed_mastery_shirt_front.jpg",
          "/images/untamed_mastery_shirt_combat.jpg"
        ]
      },
      {
        title: "UNTMD Gallo de Pelea Tee – Premium Lightweight",
        price: "$499 MXN",
        images: [
          "/images/gallo_de_pelea_shirt_back_bam_bam.jpg",
          "/images/gallo_de_pelea_shirt_front.jpg",
          "/images/gallo_de_pelea_shirt_back_focus.jpg"
        ]
      },
      {
        title: "UNTMD Kill or Be Killed Lycra – Performance Fit",
        price: "$449 MXN",
        images: [
          "/images/kobk_shirt_front.jpg",
          "/images/kobk_shirt_guard.jpg",
          "/images/kobk_shirt_water.jpg"
        ]
      }
    ];
    return products[index];
  };

  const getProductImages = (index) => {
    return getProductData(index).images;
  };

  const getCurrentImageSrc = (blockIndex) => {
    const productImages = getProductImages(blockIndex);
    return productImages[currentImages[blockIndex]];
  };

  const getImageTitle = (index) => {
    const titles = [
      "Perfection is not in doing more, but in doing one thing with absolute focus.",
      "Like the gallo de pelea, you rise with courage every round.",
      "Fighting spirit isn't taught, its bred."
    ];
    return titles[index];
  };

  return (
    <section className="apparel-section" ref={sectionRef} id="apparel">
      <div className="apparel-content">
        <h2>Apparel</h2>
        <h3>Drop Available Soon...</h3>
        <p>
          The ultimate fusion of combat sports and streetwear culture.
          Raw. Unfiltered. Untamed.
        </p>
        
        <div className="apparel-images">
          <div className="image-grid">
            {/* Left Block - UNTMD Mastery Tee */}
            <div className="product-block">
              <h4 className="product-title">{getProductData(0).title}</h4>
              <div className="image-container">
                <button 
                  className="nav-arrow nav-arrow-left" 
                  onClick={(e) => navigateImage(0, 'prev', e)}
                >
                  ‹
                </button>
                <img 
                  src={getCurrentImageSrc(0)}
                  alt="UNTMD Mastery Tee" 
                  className="apparel-image"
                  onClick={() => handleImageClick(0)}
                />
                <button 
                  className="nav-arrow nav-arrow-right" 
                  onClick={(e) => navigateImage(0, 'next', e)}
                >
                  ›
                </button>
              </div>
              <p className="product-price">{getProductData(0).price}</p>
            </div>

            {/* Middle Block - UNTMD Gallo de Pelea Tee */}
            <div className="product-block">
              <h4 className="product-title">{getProductData(1).title}</h4>
              <div className="image-container">
                <button 
                  className="nav-arrow nav-arrow-left" 
                  onClick={(e) => navigateImage(1, 'prev', e)}
                >
                  ‹
                </button>
                <img 
                  src={getCurrentImageSrc(1)}
                  alt="UNTMD Gallo de Pelea Tee" 
                  className="apparel-image"
                  onClick={() => handleImageClick(1)}
                />
                <button 
                  className="nav-arrow nav-arrow-right" 
                  onClick={(e) => navigateImage(1, 'next', e)}
                >
                  ›
                </button>
              </div>
              <p className="product-price">{getProductData(1).price}</p>
            </div>

            {/* Right Block - UNTMD Kill or Be Killed Lycra */}
            <div className="product-block">
              <h4 className="product-title">{getProductData(2).title}</h4>
              <div className="image-container">
                <button 
                  className="nav-arrow nav-arrow-left" 
                  onClick={(e) => navigateImage(2, 'prev', e)}
                >
                  ‹
                </button>
                <img 
                  src={getCurrentImageSrc(2)}
                  alt="UNTMD Kill or Be Killed Lycra" 
                  className="apparel-image"
                  onClick={() => handleImageClick(2)}
                />
                <button 
                  className="nav-arrow nav-arrow-right" 
                  onClick={(e) => navigateImage(2, 'next', e)}
                >
                  ›
                </button>
              </div>
              <p className="product-price">{getProductData(2).price}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Image Modal */}
      {expandedImage !== null && (
        <div className="expanded-image-overlay" onClick={closeExpandedImage}>
          <div className="expanded-image-container" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeExpandedImage}>
              ×
            </button>
            <img 
              src={getCurrentImageSrc(expandedImage)}
              alt="Expanded view" 
              className="expanded-image"
            />
            <h3 className="expanded-image-title">
              {getImageTitle(expandedImage)}
            </h3>
          </div>
        </div>
      )}
    </section>
  );
};

export default ApparelSection;

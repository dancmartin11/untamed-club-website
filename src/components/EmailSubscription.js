import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './EmailSubscription.css';

const EmailSubscription = ({ onSubscriptionSuccess }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    martialArts: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const sectionRef = useRef(null);

  const martialArtsOptions = [
    'Boxing', 'MMA', 'Muay Thai', 'BJJ', 'Judo', 'Karate', 
    'Taekwondo', 'Wrestling', 'Kickboxing', 'Kung Fu', 'Other'
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const title = entry.target.querySelector('h2');
          const description = entry.target.querySelector('p');
          const form = entry.target.querySelector('.subscription-form');
          const privacyNote = entry.target.querySelector('.privacy-note');
          
          if (title) title.classList.add('animate');
          if (description) description.classList.add('animate');
          if (form) form.classList.add('animate');
          if (privacyNote) privacyNote.classList.add('animate');
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

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMartialArtToggle = (martialArt) => {
    setFormData(prev => ({
      ...prev,
      martialArts: prev.martialArts.includes(martialArt)
        ? prev.martialArts.filter(art => art !== martialArt)
        : [...prev.martialArts, martialArt]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.firstName.trim()) {
      setError('Please enter your first name');
      return;
    }

    if (!formData.lastName.trim()) {
      setError('Please enter your last name');
      return;
    }

    if (!formData.email.trim()) {
      setError('Please enter your email address');
      return;
    }

    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post('/api/subscribe', formData);
      
      if (response.data.success) {
        setSuccess(true);
        setFormData({ firstName: '', lastName: '', email: '', martialArts: [] });
        onSubscriptionSuccess();
      } else {
        setError(response.data.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.response?.status === 409) {
        setError('This email is already subscribed!');
      } else {
        setError('Failed to subscribe. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleContinueBrowsing = () => {
    setSuccess(false);
    // Scroll to top of the page for better UX
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribeAnother = () => {
    setSuccess(false);
    // Reset form and scroll to form
    setFormData({ firstName: '', lastName: '', email: '', martialArts: [] });
    setTimeout(() => {
      const formElement = document.querySelector('.subscription-form');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };
  
  return (
    <section className="email-subscription" ref={sectionRef} id="newsletter-waitlist">
      <div className="subscription-content">
        <h2>Join our newsletter and waitlist</h2>
        <p>Be the first to know when we launch. Get exclusive early access and updates.</p>
        
        {error && <p className="error-message">{error}</p>}
        
        <form onSubmit={handleSubmit} className="subscription-form">
          <div className="form-row">
            <div className="form-group">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="First Name"
                className="name-input"
                disabled={isLoading}
                required
              />
            </div>
            
            <div className="form-group">
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Last Name"
                className="name-input"
                disabled={isLoading}
                required
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email address"
                className="email-input"
                disabled={isLoading}
                required
              />
            </div>
          </div>
          
          <div className="form-group martial-arts-section">
            <label className="martial-arts-label">Select your martial arts/sports (optional):</label>
            <div className="martial-arts-grid">
              {martialArtsOptions.map((martialArt) => (
                <label key={martialArt} className="martial-art-checkbox">
                  <input
                    type="checkbox"
                    checked={formData.martialArts.includes(martialArt)}
                    onChange={() => handleMartialArtToggle(martialArt)}
                    disabled={isLoading}
                  />
                  <span className="checkbox-custom"></span>
                  <span className="checkbox-text">{martialArt}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div className="form-group">
            <button 
              type="submit" 
              className="subscribe-btn"
              disabled={isLoading}
            >
              {isLoading ? 'Joining...' : 'Join Now'}
            </button>
          </div>
        </form>
        
        <p className="privacy-note">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>

      {/* Success Popup Modal */}
      {success && (
        <div className="success-popup-overlay">
          <div className="success-popup">
            <div className="success-popup-content">
              <h2>🎉 Welcome to the Club!</h2>
              <p>Thank you for joining Untamed Club. You're now on our exclusive waiting list!</p>
              
              <div className="success-actions">
                <button 
                  onClick={handleContinueBrowsing} 
                  className="continue-browsing-btn primary"
                >
                  Continue Browsing
                </button>
                <button 
                  onClick={handleSubscribeAnother} 
                  className="continue-browsing-btn secondary"
                >
                  Subscribe Another Email
                </button>
              </div>
              
              <div className="success-info">
                <p>We'll notify you as soon as we launch with exclusive early access!</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default EmailSubscription;

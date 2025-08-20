import React, { useState } from 'react';
import axios from 'axios';
import './EmailSubscription.css';

const EmailSubscription = ({ onSubscriptionSuccess }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post('/api/subscribe', { email });
      
      if (response.data.success) {
        setSuccess(true);
        setEmail('');
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

  if (success) {
    return (
      <section className="email-subscription success">
        <div className="subscription-content">
          <h2>🎉 You're In!</h2>
          <p>Welcome to Untamed Club. We'll keep you updated on our launch!</p>
        </div>
      </section>
    );
  }

  return (
    <section className="email-subscription">
      <div className="subscription-content">
        <h2>Join the Waiting List</h2>
        <p>Be the first to know when we launch. Get exclusive early access and updates.</p>
        
        <form onSubmit={handleSubmit} className="subscription-form">
          <div className="form-group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="email-input"
              disabled={isLoading}
            />
            <button 
              type="submit" 
              className="subscribe-btn"
              disabled={isLoading}
            >
              {isLoading ? 'Joining...' : 'Join Now'}
            </button>
          </div>
          
          {error && <p className="error-message">{error}</p>}
        </form>
        
        <p className="privacy-note">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
};

export default EmailSubscription;

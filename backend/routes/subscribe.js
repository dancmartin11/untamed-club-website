const express = require('express');
const Subscriber = require('../models/Subscriber');
const emailService = require('../services/emailService');

const router = express.Router();

// POST /api/subscribe - Add new subscriber
router.post('/', async (req, res) => {
  try {
    const { email } = req.body;
    
    // Validate email
    if (!email || !email.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    // Check if email already exists
    const existingSubscriber = await Subscriber.emailExists(email);
    if (existingSubscriber) {
      if (existingSubscriber.status === 'unsubscribed') {
        // Reactivate unsubscribed user
        existingSubscriber.status = 'active';
        await existingSubscriber.save();
        
        // Send welcome back email
        try {
          await emailService.sendWelcomeBackEmail(email);
        } catch (emailError) {
          console.log('Welcome back email failed:', emailError.message);
        }
        
        return res.json({
          success: true,
          message: 'Welcome back! You have been resubscribed.',
          data: { email: existingSubscriber.email }
        });
      }
      
      return res.status(409).json({
        success: false,
        message: 'This email is already subscribed to our newsletter'
      });
    }

    // Create new subscriber
    const subscriber = new Subscriber({
      email: email.trim(),
      metadata: {
        ipAddress: req.ip || req.connection.remoteAddress,
        userAgent: req.get('User-Agent'),
        referrer: req.get('Referer')
      }
    });

    await subscriber.save();

    // Send welcome email
    try {
      await emailService.sendWelcomeEmail(email);
      subscriber.incrementEmailCount();
    } catch (emailError) {
      console.log('Welcome email failed:', emailError.message);
      // Don't fail the subscription if email fails
    }

    res.status(201).json({
      success: true,
      message: 'Successfully subscribed to Untamed Club newsletter!',
      data: { email: subscriber.email }
    });

  } catch (error) {
    console.error('Subscription error:', error);
    
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'This email is already subscribed'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Failed to subscribe. Please try again later.'
    });
  }
});

// GET /api/subscribe - Get subscriber count (for admin purposes)
router.get('/count', async (req, res) => {
  try {
    const count = await Subscriber.countDocuments({ status: 'active' });
    res.json({
      success: true,
      data: { subscriberCount: count }
    });
  } catch (error) {
    console.error('Count error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get subscriber count'
    });
  }
});

// POST /api/subscribe/unsubscribe - Unsubscribe
router.post('/unsubscribe', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    const subscriber = await Subscriber.emailExists(email);
    if (!subscriber) {
      return res.status(404).json({
        success: false,
        message: 'Email not found in our system'
      });
    }

    await subscriber.unsubscribe();

    res.json({
      success: true,
      message: 'Successfully unsubscribed from Untamed Club newsletter'
    });

  } catch (error) {
    console.error('Unsubscribe error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to unsubscribe. Please try again later.'
    });
  }
});

module.exports = router;

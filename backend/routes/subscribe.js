const express = require('express');
const Subscriber = require('../models/Subscriber');
const emailService = require('../services/emailService');

const router = express.Router();

// POST /api/subscribe
router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, email, martialArts } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email) {
      return res.status(400).json({
        success: false,
        message: 'First name, last name, and email are required'
      });
    }

    // Check if email already exists
    const existingSubscriber = await Subscriber.findOne({ email: email.toLowerCase() });

    if (existingSubscriber) {
      // Update existing subscriber's information
      existingSubscriber.firstName = firstName;
      existingSubscriber.lastName = lastName;
      if (martialArts && Array.isArray(martialArts)) {
        existingSubscriber.martialArts = martialArts;
      }
      await existingSubscriber.save();

      // Send welcome back email
      try {
        await emailService.sendWelcomeBackEmail(email, firstName);
      } catch (emailError) {
        console.error('Failed to send welcome back email:', emailError);
        // Don't fail the subscription if email fails
      }

      return res.status(200).json({
        success: true,
        message: 'Welcome back! Your information has been updated.',
        data: {
          firstName: existingSubscriber.firstName,
          lastName: existingSubscriber.lastName,
          email: existingSubscriber.email,
          martialArts: existingSubscriber.martialArts
        }
      });
    }

    // Create new subscriber
    const subscriber = new Subscriber({
      firstName,
      lastName,
      email: email.toLowerCase(),
      martialArts: Array.isArray(martialArts) ? martialArts : []
    });

    await subscriber.save();

    // Send welcome email
    try {
      await emailService.sendWelcomeEmail(email, firstName);
    } catch (emailError) {
      console.error('Failed to send welcome email:', emailError);
      // Don't fail the subscription if email fails
    }

    res.status(201).json({
      success: true,
      message: 'Successfully subscribed to Untamed Club!',
      data: {
        firstName: subscriber.firstName,
        lastName: subscriber.lastName,
        email: subscriber.email,
        martialArts: subscriber.martialArts
      }
    });

  } catch (error) {
    console.error('Subscription error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error. Please try again later.'
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

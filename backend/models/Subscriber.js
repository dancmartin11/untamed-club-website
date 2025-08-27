const mongoose = require('mongoose');

const subscriberSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  martialArts: {
    type: [String],
    default: [],
    validate: {
      validator: function(v) {
        const validArts = ['Boxing', 'MMA', 'Muay Thai', 'BJJ', 'Judo', 'Karate', 'Taekwondo', 'Wrestling', 'Kickboxing', 'Kung Fu', 'Other'];
        return v.every(art => validArts.includes(art));
      },
      message: 'Invalid martial art selection'
    }
  },
  subscribedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Subscriber', subscriberSchema);

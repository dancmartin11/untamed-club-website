const mongoose = require('mongoose');

const subscriberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please enter a valid email address'
    ]
  },
  status: {
    type: String,
    enum: ['active', 'unsubscribed', 'bounced'],
    default: 'active'
  },
  source: {
    type: String,
    default: 'landing_page'
  },
  metadata: {
    ipAddress: String,
    userAgent: String,
    referrer: String
  },
  lastEmailSent: {
    type: Date,
    default: null
  },
  emailCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for faster queries
subscriberSchema.index({ email: 1 });
subscriberSchema.index({ status: 1 });
subscriberSchema.index({ createdAt: -1 });

// Pre-save middleware to ensure email is lowercase
subscriberSchema.pre('save', function(next) {
  if (this.email) {
    this.email = this.email.toLowerCase();
  }
  next();
});

// Static method to check if email exists
subscriberSchema.statics.emailExists = function(email) {
  return this.findOne({ email: email.toLowerCase() });
};

// Instance method to mark as unsubscribed
subscriberSchema.methods.unsubscribe = function() {
  this.status = 'unsubscribed';
  return this.save();
};

// Instance method to mark as bounced
subscriberSchema.methods.markAsBounced = function() {
  this.status = 'bounced';
  return this.save();
};

// Instance method to increment email count
subscriberSchema.methods.incrementEmailCount = function() {
  this.emailCount += 1;
  this.lastEmailSent = new Date();
  return this.save();
};

module.exports = mongoose.model('Subscriber', subscriberSchema);

const nodemailer = require('nodemailer');

// Conditionally import SendGrid only if it's configured
let sgMail = null;
try {
  if (process.env.EMAIL_PROVIDER === 'sendgrid') {
    sgMail = require('@sendgrid/mail');
    if (process.env.SENDGRID_API_KEY) {
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    }
  }
} catch (error) {
  console.log('SendGrid not available:', error.message);
}

// Create transporter (configure based on your email provider)
const createTransporter = () => {
  // For Gmail (you'll need to enable 2FA and use App Password)
  if (process.env.EMAIL_PROVIDER === 'gmail') {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD
      }
    });
  }
  
  // For SendGrid
  if (process.env.EMAIL_PROVIDER === 'sendgrid') {
    return nodemailer.createTransport({
      host: 'smtp.sendgrid.net',
      port: 587,
      secure: false,
      auth: {
        user: 'apikey',
        pass: process.env.SENDGRID_API_KEY
      }
    });
  }
  
  // For custom SMTP
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
};

// Send with SendGrid template (if available)
const sendWithSendGridTemplate = async ({ to, templateId, data }) => {
  if (!sgMail) {
    throw new Error('SendGrid not configured');
  }
  
  return sgMail.send({
    to,
    from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
    templateId,
    dynamicTemplateData: data,
  });
};

// Send welcome email to new subscribers
const sendWelcomeEmail = async (email, firstName) => {
  try {
    // Try SendGrid template first if configured
    if (process.env.EMAIL_PROVIDER === 'sendgrid' && 
        process.env.SENDGRID_WELCOME_TEMPLATE_ID && 
        sgMail) {
      return await sendWithSendGridTemplate({
        to: email,
        templateId: process.env.SENDGRID_WELCOME_TEMPLATE_ID,
        data: {
          firstName: firstName,
          brandName: 'Untamed Club',
          unsubscribeUrl: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/unsubscribe?email=${encodeURIComponent(email)}`
        }
      });
    }
    
    // Fallback to Nodemailer
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"Untamed Club" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
      to: email,
      subject: '🥊 Welcome to Untamed Club - You\'re on the List!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #000000; color: #ffffff; padding: 40px;">
          <div style="text-align: center; margin-bottom: 40px;">
            <h1 style="color: #c5a020; font-size: 2.5rem; margin-bottom: 20px;">UNTAMED CLUB</h1>
            <p style="font-size: 1.2rem; color: #cccccc;">Combat Sports & Streetwear</p>
          </div>
          
          <div style="background: #111111; padding: 30px; border-radius: 8px; border-left: 5px solid #c5a020;">
            <h2 style="color: #c5a020; margin-bottom: 20px;">Welcome to the Club, ${firstName}! 🥊</h2>
            <p style="font-size: 1.1rem; line-height: 1.6; margin-bottom: 20px;">
              You're now on our exclusive waiting list. We're building something special for combat sports enthusiasts and streetwear lovers.
            </p>
            <p style="font-size: 1.1rem; line-height: 1.6; margin-bottom: 20px;">
              We'll notify you as soon as we launch with exclusive early access and special offers.
            </p>
          </div>
          
          <div style="margin-top: 40px; text-align: center;">
            <p style="color: #888888; font-size: 0.9rem;">
              Raw. Unfiltered. Untamed.
            </p>
          </div>
        </div>
      `,
      text: `
Welcome to Untamed Club, ${firstName}! 🥊

You're now on our exclusive waiting list. We're building something special for combat sports enthusiasts and streetwear lovers.

We'll notify you as soon as we launch with exclusive early access and special offers.

Raw. Unfiltered. Untamed.
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Welcome email sent:', info.messageId);
    return info;
    
  } catch (error) {
    console.error('❌ Welcome email failed:', error);
    throw error;
  }
};

// Send welcome back email to resubscribed users
const sendWelcomeBackEmail = async (email, firstName) => {
  try {
    // Try SendGrid template first if configured
    if (process.env.EMAIL_PROVIDER === 'sendgrid' && 
        process.env.SENDGRID_WELCOME_BACK_TEMPLATE_ID && 
        sgMail) {
      return await sendWithSendGridTemplate({
        to: email,
        templateId: process.env.SENDGRID_WELCOME_BACK_TEMPLATE_ID,
        data: {
          firstName: firstName,
          brandName: 'Untamed Club'
        }
      });
    }
    
    // Fallback to Nodemailer
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"Untamed Club" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
      to: email,
      subject: '🥊 Welcome Back to Untamed Club!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #000000; color: #ffffff; padding: 40px;">
          <div style="text-align: center; margin-bottom: 40px;">
            <h1 style="color: #c5a020; font-size: 2.5rem; margin-bottom: 20px;">UNTAMED CLUB</h1>
            <p style="font-size: 1.2rem; color: #cccccc;">Combat Sports & Streetwear</p>
          </div>
          
          <div style="background: #111111; padding: 30px; border-radius: 8px; border-left: 5px solid #c5a020;">
            <h2 style="color: #c5a020; margin-bottom: 20px;">Welcome Back, ${firstName}! 🎉</h2>
            <p style="font-size: 1.1rem; line-height: 1.6; margin-bottom: 20px;">
              Great to have you back in the club! You're now resubscribed to our newsletter and will receive all the latest updates.
            </p>
            <p style="font-size: 1.1rem; line-height: 1.6; margin-bottom: 20px;">
              We're still working on something amazing. Stay tuned!
            </p>
          </div>
          
          <div style="margin-top: 40px; text-align: center;">
            <p style="color: #888888; font-size: 0.9rem;">
              Raw. Unfiltered. Untamed.
            </p>
          </div>
        </div>
      `,
      text: `
Welcome Back to Untamed Club, ${firstName}! 🎉

Great to have you back in the club! You're now resubscribed to our newsletter and will receive all the latest updates.

We're still working on something amazing. Stay tuned!

Raw. Unfiltered. Untamed.
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Welcome back email sent:', info.messageId);
    return info;
    
  } catch (error) {
    console.error('❌ Welcome back email failed:', error);
    throw error;
  }
};

// Send newsletter (for future use)
const sendNewsletter = async (subscribers, subject, content) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"Untamed Club" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
      bcc: subscribers,
      subject: subject,
      html: content,
      text: content.replace(/<[^>]*>/g, '') // Strip HTML tags for text version
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Newsletter sent:', info.messageId);
    return info;
    
  } catch (error) {
    console.error('❌ Newsletter failed:', error);
    throw error;
  }
};

module.exports = {
  sendWelcomeEmail,
  sendWelcomeBackEmail,
  sendNewsletter
};

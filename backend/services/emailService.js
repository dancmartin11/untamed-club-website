const sgMail = require('@sendgrid/mail');

if (process.env.EMAIL_PROVIDER === 'sendgrid') {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

const sendWithSendGridTemplate = async ({ to, templateId, data }) => {
  return sgMail.send({
    to,
    from: process.env.EMAIL_FROM,
    templateId,
    dynamicTemplateData: data,
  });
};

const sendWelcomeEmail = async (email) => {
  if (process.env.EMAIL_PROVIDER === 'sendgrid' && process.env.SENDGRID_WELCOME_TEMPLATE_ID) {
    return sendWithSendGridTemplate({
      to: email,
      templateId: process.env.SENDGRID_WELCOME_TEMPLATE_ID,
      data: {
        brandName: 'Untamed Club',
        unsubscribeUrl: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/unsubscribe?email=${encodeURIComponent(email)}`
      }
    });
  }
  // fallback: existing nodemailer HTML
};

const sendWelcomeBackEmail = async (email) => {
  if (process.env.EMAIL_PROVIDER === 'sendgrid' && process.env.SENDGRID_WELCOME_BACK_TEMPLATE_ID) {
    return sendWithSendGridTemplate({
      to: email,
      templateId: process.env.SENDGRID_WELCOME_BACK_TEMPLATE_ID,
      data: {
        brandName: 'Untamed Club'
      }
    });
  }
  // fallback: existing nodemailer HTML
};

module.exports = { sendWelcomeEmail, sendWelcomeBackEmail, sendNewsletter: () => {} };

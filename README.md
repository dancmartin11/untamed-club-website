# Untamed Club - Landing Page

A modern, responsive landing page for Untamed Club, a combat sports and streetwear brand. Built with React (frontend) and Node.js/Express (backend), featuring email collection, MongoDB storage, apparel showcase, and optional automated emails (Gmail/SendGrid).

## 🥊 Features

- **Hero Section**: "Coming Soon…" with immersive brand imagery
- **Apparel Showcase**: Interactive product display with image navigation
- **Email Collection**: Newsletter form with validation
- **MongoDB Integration**: Secure subscriber storage
- **Automated Emails**: Welcome emails via Nodemailer or SendGrid
- **Responsive Design**: Mobile-first, animations, modern UI
- **Interactive Navigation**: Logo click-to-top, smooth scrolling
- **Scalable**: Structured to grow into a newsletter bot

## 🚀 Tech Stack

- **Frontend**: React 18, CSS, Axios
- **Backend**: Node.js, Express, Mongoose, Helmet, CORS, Rate-limiting
- **Email**: Nodemailer (Gmail/SMTP) or SendGrid
- **DB**: MongoDB Atlas

## 📁 Project Structure

```
website/
├── public/
│   ├── index.html
│   └── images/                # Place brand images here (required)
├── src/
│   ├── components/
│   │   ├── HeroSection.js
│   │   ├── BrandSection.js
│   │   ├── ApparelSection.js  # NEW: Product showcase with navigation
│   │   ├── CommunitySection.js
│   │   ├── EmailSubscription.js
│   │   └── Navigation.js      # NEW: Logo and navigation
│   ├── App.js
│   ├── index.js
│   └── *.css
├── backend/
│   ├── models/
│   │   └── Subscriber.js
│   ├── routes/
│   │   └── subscribe.js
│   ├── services/
│   │   └── emailService.js
│   ├── server.js
│   └── package.json
├── images/                     # For reference only; move contents to public/images
├── package.json
├── start.bat                   # Windows quick start
├── deploy.sh
├── LICENSE
└── README.md
```

## ✨ New Features (Latest Update)

### 🎯 **Apparel Section**
- **Product Blocks**: Three main products with titles and prices
- **Image Navigation**: Left/right arrows to browse multiple product photos
- **Product Details**:
  - Left: "UNTMD Mastery Tee | Premium Lightweight" - $499 MXN
  - Middle: "UNTMD Gallo de Pelea Tee – Premium Lightweight" - $499 MXN
  - Right: "UNTMD Kill or Be Killed Lycra – Performance Fit" - $449 MXN
- **Interactive Gallery**: Click to expand images with custom legends
- **Responsive Design**: Optimized for all screen sizes

### 🖼️ **Image Management**
- **Multiple Photos per Product**: Each product has 3 different images
- **Smooth Navigation**: Circular navigation through product photos
- **Expanded View**: Full-screen modal with product-specific titles
- **Optimized Layout**: Product blocks sized for optimal image display

### 🧭 **Enhanced Navigation**
- **Brand Logo**: Untamed Club logo positioned at top-left
- **Click to Top**: Logo click smoothly scrolls to page top
- **Visual Feedback**: Hover effects and pointer cursor
- **Responsive Logo**: SVG format with proper scaling

### 🎨 **UI Improvements**
- **Reduced Text Sizes**: Optimized expanded image legends
- **Better Spacing**: Improved product block proportions
- **Smooth Animations**: Enhanced hover effects and transitions
- **Professional Layout**: Clean, modern product presentation

## ✅ Local Setup Checklist

1) Node.js 16+ and npm installed  
2) MongoDB Atlas cluster and connection string  
3) Email provider (optional for first test)

## ⚙️ Setup Steps

### 1) Move Images (required)
- Move all files under `website/images/` → `website/public/images/`
- Components reference `/images/...` which CRA serves from `public/`
- **Required Images**:
  - `untamedCLUB_logo.svg` (navigation logo)
  - `untamed_mastery_shirt_*.jpg` (3 images for Mastery Tee)
  - `gallo_de_pelea_shirt_*.jpg` (3 images for Gallo Tee)
  - `kobk_shirt_*.jpg` (3 images for KOBK Lycra)

### 2) Frontend proxy (dev only)
Ensure root `website/package.json` has:
```json
{
  "proxy": "http://localhost:5000"
}
```

### 3) Backend environment
Create `website/backend/.env`:
```env
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/untamedclub_db?retryWrites=true&w=majority

# Choose ONE email provider (optional for first test)

# Gmail (App Password required)
# EMAIL_PROVIDER=gmail
# EMAIL_USER=your-email@gmail.com
# EMAIL_APP_PASSWORD=your-16-char-app-password
# EMAIL_FROM=noreply@untamedclub.shop

# SendGrid (Single Sender works without DNS)
# EMAIL_PROVIDER=sendgrid
# SENDGRID_API_KEY=SG.xxxxx...
# EMAIL_FROM=your-verified-email@example.com
```

### 4) Install dependencies
```bash
# From website/
npm install
cd backend && npm install && cd ..
```

### 5) Start locally
- Windows: double-click `start.bat`, or:
```bash
npm run dev
```
- Frontend: http://localhost:3000  
- Backend:  http://localhost:5000

## 🧪 How to Test

1) Visit http://localhost:3000 and confirm images render  
2) Test apparel section navigation arrows
3) Click on product images to expand view
4) Click logo to scroll to top
5) Submit a test email in the form  
6) Expect `POST /api/subscribe` → 201  
7) Check Atlas: database (e.g., `untamedclub_db`) should have `subscribers` with your email  
8) Health check: http://localhost:5000/api/health

Notes:
- You do NOT need to pre-create collections; MongoDB/Mongoose creates `subscribers` on first insert.
- Indexes defined in `Subscriber.js` are created automatically.

## 📧 Email Setup

### Option A: Gmail (simple for dev)
- Enable 2FA → create an App Password → use in `.env`
- Limits apply; good for early testing

### Option B: SendGrid (recommended for scaling)
- Create account → verify a Single Sender (no DNS required to start)
- Create API key → add to `.env`
- `EMAIL_FROM` must be your verified sender email unless you authenticate your domain

### DNS Records (optional, later)
- Domain authentication improves deliverability and allows sending from `noreply@untamedclub.shop`
- Not required to start

## 🧩 Optional: SendGrid Dynamic Templates

If you created a Dynamic Template in SendGrid, you can send it:

1) Install SDK:
```bash
cd backend
npm i @sendgrid/mail
```

2) Add to `.env`:
```env
EMAIL_PROVIDER=sendgrid
SENDGRID_API_KEY=SG.xxxxx...
EMAIL_FROM=noreply@untamedclub.shop   # or your verified single sender
SENDGRID_WELCOME_TEMPLATE_ID=d-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
SENDGRID_WELCOME_BACK_TEMPLATE_ID=d-yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy
```

3) Update `backend/services/emailService.js` (example usage):
```js
// If using SendGrid templates:
const sgMail = require('@sendgrid/mail');
if (process.env.EMAIL_PROVIDER === 'sendgrid') {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

const sendWithSendGridTemplate = ({ to, templateId, data }) => {
  return sgMail.send({
    to,
    from: process.env.EMAIL_FROM,
    templateId,
    dynamicTemplateData: data
  });
};

// In sendWelcomeEmail/sendWelcomeBackEmail:
// if (process.env.EMAIL_PROVIDER === 'sendgrid' && process.env.SENDGRID_WELCOME_TEMPLATE_ID) {
//   return sendWithSendGridTemplate({ to: email, templateId: process.env.SENDGRID_WELCOME_TEMPLATE_ID, data: { brandName: 'Untamed Club' } });
// }
```

Template variables in SendGrid should match `dynamicTemplateData` keys (e.g., `{{brandName}}`, `{{unsubscribeUrl}}`).

## 🔧 Known Fix

If using Nodemailer (default), ensure transporter creation uses:
```js
// Correct:
nodemailer.createTransport(...)
// Not:
nodemailer.createTransporter(...)
```

## 🌐 Deployment

### Frontend
```bash
npm run build
```
Deploy the `build/` folder to:
- Netlify / Vercel / S3 / Traditional hosting (e.g., GoDaddy)

### Backend
Deploy `backend/` to:
- Railway / Render / DigitalOcean / EC2 / Heroku
- Set environment variables from `.env`
- Start with `npm start`

### Domain
- Point `untamedclub.shop` to your hosting
- Update `FRONTEND_URL` in backend `.env`
- Configure SSL

## 🔮 Future Newsletter Bot

- Scrape UFC/boxing news
- Generate content
- Schedule weekly sends (cron)
- Track opens/clicks

## 🧰 Troubleshooting

- 404 on `/api/subscribe`: backend not running or missing `"proxy"` in root `package.json`
- CORS error: ensure `FRONTEND_URL=http://localhost:3000` and use the proxy in dev
- Images missing: ensure files are in `public/images` and referenced as `/images/...`
- MongoDB connection: verify `MONGODB_URI`, IP allowlist, user credentials
- SendGrid: Single Sender verified and correct API key; DNS auth optional but improves deliverability
- Apparel images not loading: verify all 9 product images are in `public/images/`

## 📊 API Endpoints

- `POST /api/subscribe` — Subscribe
- `GET /api/subscribe/count` — Subscriber count
- `POST /api/subscribe/unsubscribe` — Unsubscribe
- `GET /api/health` — Health check

## 📱 Responsive Design

- Mobile-first
- Breakpoints: 480px, 768px, 1200px
- Optimized images and animations
- Product blocks adapt to screen size

## 🎨 Theme

- Primary: `#c5a020` (Gold)
- Secondary: `#000000` (Black)
- Background: `#ffffff` (White)
- Text: `#000000` (Black)
- Font: Inter

## 📄 License

MIT — © Untamed Club

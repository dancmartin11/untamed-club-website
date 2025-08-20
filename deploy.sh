#!/bin/bash

echo "🥊 Untamed Club - Deployment Script"
echo "=================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the website root directory"
    exit 1
fi

# Build the React app
echo "🔨 Building React app..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

echo "✅ Build completed successfully!"

# Check if backend exists
if [ -d "backend" ]; then
    echo "🔧 Backend detected - checking configuration..."
    
    if [ ! -f "backend/.env" ]; then
        echo "⚠️  Warning: No .env file found in backend directory"
        echo "   Please copy backend/env.example to backend/.env and configure it"
    else
        echo "✅ Backend environment file found"
    fi
fi

# Create deployment package
echo "📦 Creating deployment package..."
DEPLOY_DIR="untamed-club-deploy-$(date +%Y%m%d-%H%M%S)"
mkdir -p $DEPLOY_DIR

# Copy frontend build
cp -r build $DEPLOY_DIR/frontend

# Copy backend if it exists
if [ -d "backend" ]; then
    cp -r backend $DEPLOY_DIR/
    # Remove dev dependencies from backend package.json for production
    if [ -f "$DEPLOY_DIR/backend/package.json" ]; then
        echo "📝 Updating backend package.json for production..."
        sed -i '/nodemon/d' $DEPLOY_DIR/backend/package.json
        sed -i 's/"dev": "nodemon server.js",//' $DEPLOY_DIR/backend/package.json
    fi
fi

# Copy configuration files
cp README.md $DEPLOY_DIR/
cp package.json $DEPLOY_DIR/

# Create deployment instructions
cat > $DEPLOY_DIR/DEPLOYMENT_INSTRUCTIONS.md << 'EOF'
# Deployment Instructions

## Frontend Deployment

1. **Netlify/Vercel (Recommended)**
   - Upload the `frontend` folder contents
   - Set build command: `npm run build`
   - Set publish directory: `build`

2. **Traditional Hosting**
   - Upload the `frontend` folder contents to your web server
   - Ensure all files are in the public_html or www directory

## Backend Deployment

1. **Heroku**
   ```bash
   cd backend
   heroku create untamed-club-api
   heroku config:set NODE_ENV=production
   heroku config:set MONGODB_URI=your_mongodb_uri
   git push heroku main
   ```

2. **DigitalOcean/Railway**
   - Upload the `backend` folder
   - Install dependencies: `npm install --production`
   - Set environment variables
   - Start with: `npm start`

## Environment Variables

Copy `backend/env.example` to `backend/.env` and configure:

- `MONGODB_URI`: Your MongoDB Atlas connection string
- `EMAIL_PROVIDER`: gmail, sendgrid, or smtp
- `EMAIL_USER`: Your email address
- `EMAIL_APP_PASSWORD`: App password or API key

## Domain Configuration

1. Point `untamedclub.shop` to your hosting service
2. Update `FRONTEND_URL` in backend environment
3. Configure SSL certificates

## Testing

After deployment, test:
- [ ] Frontend loads correctly
- [ ] Email subscription form works
- [ ] Welcome emails are sent
- [ ] MongoDB connection is working
EOF

# Create zip file
echo "🗜️  Creating deployment archive..."
zip -r "$DEPLOY_DIR.zip" "$DEPLOY_DIR"

echo ""
echo "🎉 Deployment package created: $DEPLOY_DIR.zip"
echo ""
echo "📋 Next steps:"
echo "1. Extract the deployment package"
echo "2. Follow the DEPLOYMENT_INSTRUCTIONS.md"
echo "3. Configure your environment variables"
echo "4. Deploy to your hosting service"
echo ""
echo "🔗 Useful links:"
echo "- MongoDB Atlas: https://cloud.mongodb.com"
echo "- Netlify: https://netlify.com"
echo "- Vercel: https://vercel.com"
echo "- Heroku: https://heroku.com"
echo ""
echo "🥊 Good luck with the launch!"

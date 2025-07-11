#!/bin/bash

# BookVault Deployment Script

echo "🚀 Starting BookVault Deployment..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the BookVault root directory"
    exit 1
fi

# Frontend Build
echo "📦 Building frontend..."
cd frontend
npm ci
npm run build
cd ..

echo "✅ Frontend build complete!"

# Backend preparation
echo "🔧 Preparing backend..."
npm ci

echo "✅ Backend ready!"

echo "🎉 Deployment preparation complete!"
echo "📝 Next steps:"
echo "   1. Push to GitHub: git add . && git commit -m 'Deploy' && git push"
echo "   2. Deploy backend to Railway"
echo "   3. Deploy frontend to Vercel"
echo "   4. Update CORS origins in server.js with your production URLs"

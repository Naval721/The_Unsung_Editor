#!/bin/bash

echo "🚀 Starting production deployment..."

# Clean previous build
echo "🧹 Cleaning previous build..."
npm run clean

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build for production
echo "🔨 Building for production..."
npm run build:prod

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Production build successful!"
    echo "📁 Build output is in the 'dist' folder"
    echo ""
    echo "🌐 To deploy:"
    echo "   - Vercel: vercel --prod"
    echo "   - Netlify: netlify deploy --prod"
    echo "   - Manual: Upload 'dist' folder to your hosting provider"
else
    echo "❌ Build failed!"
    exit 1
fi
# Deployment Guide

## Overview
This project is now fully configured for production deployment with optimized builds and multiple deployment options.

## Quick Deploy

### Option 1: Automated Deployment Script
```bash
./deploy.sh
```
This script will:
- Clean previous builds
- Install dependencies
- Build for production
- Provide deployment instructions

### Option 2: Manual Commands
```bash
npm run deploy
# or
npm run clean && npm run build:prod
```

## Deployment Platforms

### Vercel (Recommended)
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel --prod`
3. Follow the prompts to configure your project

### Netlify
1. Install Netlify CLI: `npm i -g netlify-cli`
2. Run: `netlify deploy --prod`
3. Follow the prompts to configure your project

### Manual Deployment
1. Build: `npm run build:prod`
2. Upload the `dist` folder to your hosting provider
3. Configure your server to serve `index.html` for all routes (SPA routing)

## Production Features

### Build Optimizations
- Code splitting for better performance
- Terser minification
- Optimized asset handling
- Proper caching headers

### Security
- Security headers configured
- XSS protection
- Content type protection
- Frame protection

### Performance
- Static asset caching
- Optimized bundle sizes
- Tree shaking enabled

## Environment Configuration

### Production Environment
- `VITE_APP_TITLE`: Application title
- `VITE_APP_DESCRIPTION`: Application description
- `VITE_APP_BASE_URL`: Base URL for routing

### Build Modes
- `development`: Development build with source maps
- `production`: Optimized production build

## Troubleshooting

### Common Issues
1. **Build fails with terser error**: Run `npm install --save-dev terser`
2. **Dependencies not found**: Run `npm install` to reinstall
3. **Build cache issues**: Run `npm run clean` before building

### Performance Issues
1. Check bundle sizes in build output
2. Verify code splitting is working
3. Ensure proper caching headers

## Support
For deployment issues, refer to:
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com/)

## Project Rights
This project is managed by the Gx team. All deployment and configuration changes should be coordinated through the Gx Creator platform.
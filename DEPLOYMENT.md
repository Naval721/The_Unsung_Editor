# Deployment Guide

## Overview
This project is now fully configured for production deployment with optimized builds and multiple deployment options.

## Quick Deploy

### Option 1: Automated Build Script
```bash
./build.sh
```
This script will:
- Clean previous builds
- Install dependencies (if needed)
- Build for production
- Provide deployment instructions

### Option 2: Manual Commands
```bash
npm run deploy
# or
npm run clean && npm run build
```

## Deployment Platforms

### Vercel (Recommended)
1. **Automatic Deployment**: Connect your GitHub repository to Vercel
2. **Build Command**: The project automatically uses `npm run build`
3. **Output Directory**: `dist`
4. **Node Version**: 18.x (automatically detected)

**Vercel Configuration**: The project includes `vercel.json` with proper routing.

**Important**: The project includes the necessary Linux-specific rollup dependencies for Vercel deployment.

### Netlify
1. Install Netlify CLI: `npm i -g netlify-cli`
2. Run: `netlify deploy --prod`
3. Follow the prompts to configure your project

### Manual Deployment
1. Build: `npm run build`
2. Upload the `dist` folder to your hosting provider
3. Configure your server to serve `index.html` for all routes (SPA routing)

## Production Features

### Build Optimizations
- Code splitting for better performance
- Optimized asset handling
- Proper routing configuration

### Performance
- Static asset optimization
- Optimized bundle sizes
- Tree shaking enabled

## Environment Configuration

### Build Modes
- `development`: Development build with source maps
- `production`: Optimized production build

## Troubleshooting

### Common Issues
1. **Build fails with rollup error**: Run `npm install --save-dev @rollup/rollup-linux-x64-gnu`
2. **Dependencies not found**: Run `npm install` to reinstall
3. **Build cache issues**: Run `npm run clean` before building

### Vercel-Specific Issues
1. **Rollup dependency errors**: The project includes `@rollup/rollup-linux-x64-gnu` for Linux environments
2. **Build command not found**: Ensure `npm run build` is available
3. **Platform-specific packages**: Automatically handled by included dependencies

### Performance Issues
1. Check bundle sizes in build output
2. Verify code splitting is working
3. Ensure proper routing configuration

## Support
For deployment issues, refer to:
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com/)

## Project Rights
This project is managed by the Gx team. All deployment and configuration changes should be coordinated through the Gx Creator platform.
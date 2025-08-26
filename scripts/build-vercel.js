#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Vercel build process...');

try {
  // Clean previous build
  console.log('🧹 Cleaning previous build...');
  if (fs.existsSync('dist')) {
    execSync('rm -rf dist', { stdio: 'inherit' });
  }

  // Clean node_modules and package-lock.json to resolve rollup issues
  console.log('🧹 Cleaning dependencies to resolve rollup issues...');
  if (fs.existsSync('node_modules')) {
    execSync('rm -rf node_modules', { stdio: 'inherit' });
  }
  if (fs.existsSync('package-lock.json')) {
    execSync('rm -f package-lock.json', { stdio: 'inherit' });
  }

  // Install dependencies
  console.log('📦 Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });

  // Build for production
  console.log('🔨 Building for production...');
  execSync('npm run build:prod', { stdio: 'inherit' });

  console.log('✅ Vercel build completed successfully!');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
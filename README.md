# Narrative Motion Design - Gx Creator Project

## Project info

**URL**: https://gxcreator.dev/projects/aad5aab2-7873-4405-a643-58920bf087e3

## How can I edit this code?

There are several ways of editing your application.

**Use Gx Creator**

Simply visit the [Gx Creator Project](https://gxcreator.dev/projects/aad5aab2-7873-4405-a643-58920bf087e3) and start prompting.

Changes made via Gx Creator will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Gx Creator.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

### Option 1: Gx Creator (Recommended)
Simply open [Gx Creator](https://gxcreator.dev/projects/aad5aab2-7873-4405-a643-58920bf087e3) and click on Share -> Publish.

### Option 2: Manual Deployment

#### Build for Production
```sh
npm run build:prod
```

#### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel --prod`

#### Deploy to Netlify
1. Install Netlify CLI: `npm i -g netlify-cli`
2. Run: `netlify deploy --prod`

#### Deploy to any static hosting
1. Build: `npm run build:prod`
2. Upload the `dist` folder to your hosting provider

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for development
- `npm run build:prod` - Build for production
- `npm run preview` - Preview development build
- `npm run preview:prod` - Preview production build
- `npm run deploy` - Clean and build for production
- `npm run lint` - Run ESLint

## Can I connect a custom domain to my Gx Creator project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.gxcreator.dev/tips-tricks/custom-domain#step-by-step-guide)

## Production Deployment Notes

- The project is configured for production builds with optimized settings
- Static assets are properly cached for better performance
- SPA routing is configured for all hosting platforms
- Security headers are included for production deployments

# 🚀 Todo Webapp Deployment Guide

This guide provides detailed instructions for deploying your full-stack Todo webapp to production.

## 📋 Prerequisites

- Git repository with your code
- Supabase project (already set up)
- Node.js installed locally
- Accounts on deployment platforms (Railway for backend, Vercel for frontend)

## 🛠️ Quick Setup

Run the automated deployment preparation script:

```bash
./deploy.sh
```

This will:
- Check dependencies
- Install packages
- Run tests
- Build frontend
- Create environment templates

## 📦 Backend Deployment (Railway)

### Option 1: Railway (Recommended - Easiest)

1. **Create Railway Account**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Deploy Backend**
   ```bash
   # Push your code to GitHub first
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

3. **Connect to Railway**
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository
   - Railway will auto-detect it's a Node.js app

4. **Environment Variables**
   In Railway dashboard → Variables:
   ```
   SUPABASE_URL=https://wygqdpebsifopqwazmwc.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   PORT=3001
   NODE_ENV=production
   FRONTEND_URL=https://your-frontend-domain.vercel.app
   ```

5. **Deploy**
   - Railway will build and deploy automatically
   - Your backend URL will be something like: `https://your-app-name.up.railway.app`

### Option 2: Render

1. **Create Render Account**
   - Go to [render.com](https://render.com)

2. **Create Web Service**
   - Click "New" → "Web Service"
   - Connect your GitHub repo
   - Set build command: `npm install`
   - Set start command: `npm start`

3. **Environment Variables**
   Same as Railway above

## 🎨 Frontend Deployment (Vercel)

### Option 1: Vercel (Recommended - Easiest)

1. **Create Vercel Account**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub

2. **Deploy Frontend**
   ```bash
   # Install Vercel CLI
   npm install -g vercel

   # Deploy from frontend directory
   cd frontend
   vercel --prod
   ```

3. **Environment Variables**
   In Vercel dashboard → Project Settings → Environment Variables:
   ```
   REACT_APP_SUPABASE_URL=https://wygqdpebsifopqwazmwc.supabase.co
   REACT_APP_SUPABASE_ANON_KEY=your_anon_key
   REACT_APP_API_URL=https://your-railway-backend.up.railway.app/api
   ```

4. **Deploy**
   - Vercel will build and deploy automatically
   - Your frontend URL will be something like: `https://your-app-name.vercel.app`

### Option 2: Netlify

1. **Create Netlify Account**
   - Go to [netlify.com](https://netlify.com)

2. **Deploy**
   - Drag & drop the `frontend/build` folder to Netlify
   - Or connect your GitHub repo

3. **Environment Variables**
   In Netlify dashboard → Site settings → Environment variables:
   ```
   REACT_APP_SUPABASE_URL=https://wygqdpebsifopqwazmwc.supabase.co
   REACT_APP_SUPABASE_ANON_KEY=your_anon_key
   REACT_APP_API_URL=https://your-backend-url/api
   ```

## 🔧 Manual Deployment Steps

If you prefer manual deployment:

### Backend Setup
```bash
cd backend
npm install
npm run build  # If needed
npm start
```

### Frontend Setup
```bash
cd frontend
npm install
npm run build
# Serve the build folder with any static server
```

## 🌐 Environment Variables Reference

### Backend (.env.production)
```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
PORT=3001
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.vercel.app
```

### Frontend (.env.production)
```env
REACT_APP_SUPABASE_URL=https://your-project.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your_anon_key
REACT_APP_API_URL=https://your-backend-domain/api
```

## 🔒 Security Checklist

- [ ] Environment variables are set correctly
- [ ] Supabase keys are not exposed in client-side code
- [ ] CORS is configured for your frontend domain
- [ ] HTTPS is enabled
- [ ] Database RLS policies are active
- [ ] Rate limiting is working

## 🐛 Troubleshooting

### Backend Issues
- Check Railway/Render logs
- Verify environment variables
- Test API endpoints with curl/Postman

### Frontend Issues
- Check browser console for errors
- Verify API URLs in environment variables
- Check CORS headers from backend

### Common Build Errors

**ESLint Warnings Treated as Errors:**
If you see build errors like "Treating warnings as errors because process.env.CI = true", fix the underlying ESLint issues:

1. **Unused imports:** Remove unused imports from components
2. **Undefined variables:** Fix variable references
3. **Missing dependencies:** Add missing imports

Example fix for unused import:
```javascript
// Before (causes error)
import { FiPlus, FiTrash2, FiEdit2 } from 'react-icons/fi';

// After (fixed)
import { FiPlus, FiTrash2 } from 'react-icons/fi';
```

**Alternative:** If you must disable CI warnings (not recommended):
```bash
CI=false npm run build
```

## 📊 Performance Optimization

1. **Enable Gzip compression** (Railway/Render do this automatically)
2. **Use CDN** (Vercel/Netlify provide this)
3. **Optimize images** if you add any
4. **Enable caching headers** for static assets

## 🔄 Updates & Maintenance

- Push changes to main branch
- Deployments happen automatically
- Monitor logs in Railway/Vercel dashboards
- Update environment variables as needed

## 💰 Cost Estimation

- **Railway**: Free tier includes 512MB RAM, enough for small apps
- **Vercel**: Generous free tier, hobby plan for $7/month if needed
- **Supabase**: Free tier sufficient for development/testing

## 🎯 Next Steps

1. Test your deployed app thoroughly
2. Set up monitoring (optional)
3. Configure custom domain (optional)
4. Add error tracking (optional)

Happy deploying! 🚀

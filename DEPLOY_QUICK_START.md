# ⚡ Quick Deployment Guide

## 🚀 Fastest Way to Deploy (Railway + Vercel)

### Step 1: Deploy Backend (Railway) - 5 minutes

1. Go to [railway.app](https://railway.app) and sign up
2. Click **"New Project"**
3. Click **"New"** → **"Database"** → **"MySQL"**
   - Copy the connection details (you'll need them)
4. Click **"New"** → **"GitHub Repo"** (or **"Empty Project"**)
5. If using GitHub:
   - Select your repository
   - Root Directory: `zfunds/backend`
6. If uploading manually:
   - Upload your `zfunds/backend` folder
7. Click on the service → **"Variables"** tab
8. Add these environment variables:

```
NODE_ENV=production
DB_HOST=<from MySQL database>
DB_USER=<from MySQL database>
DB_PASSWORD=<from MySQL database>
DB_NAME=railway
JWT_SECRET=<generate a random string>
ALLOWED_ORIGINS=https://your-frontend.vercel.app
RECAPTCHA_SECRET_KEY=<your recaptcha secret>
```

9. Railway will auto-deploy! Copy the URL (e.g., `https://your-app.railway.app`)

### Step 2: Deploy Frontend (Vercel) - 3 minutes

1. Go to [vercel.com](https://vercel.com) and sign up
2. Click **"Add New"** → **"Project"**
3. Import your GitHub repository (or upload)
4. Configure:
   - **Framework Preset:** Angular
   - **Root Directory:** `zfunds/zfunds-frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist/zfunds-frontend/browser`
5. Click **"Deploy"**
6. Once deployed, copy your frontend URL

### Step 3: Update Configuration

1. **Update Frontend API URL:**
   - Edit `zfunds/zfunds-frontend/src/environments/environment.prod.ts`
   - Change `apiUrl` to your Railway backend URL + `/api`
   - Commit and push (Vercel will auto-redeploy)

2. **Update Backend CORS:**
   - Go back to Railway
   - Update `ALLOWED_ORIGINS` variable with your Vercel URL
   - Railway will auto-redeploy

3. **Update reCAPTCHA:**
   - Get production keys from [Google reCAPTCHA](https://www.google.com/recaptcha/admin)
   - Update frontend: `recaptcha.service.ts` (site key)
   - Update backend: Railway environment variable (secret key)

### Step 4: Test

1. Visit your Vercel frontend URL
2. Try registering a new user
3. Try logging in
4. Check Railway logs if anything fails

---

## 🎯 Alternative: Deploy Both on Railway

### Backend (same as above)

### Frontend on Railway:

1. In Railway, click **"New"** → **"Service"**
2. Select your repo
3. Root Directory: `zfunds/zfunds-frontend`
4. Build Command: `npm run build`
5. Start Command: `npx serve -s dist/zfunds-frontend/browser -l 3000`
6. Add environment variable: `PORT=3000`
7. Deploy!

---

## 📝 Pre-Deployment Checklist

- [ ] Update `environment.prod.ts` with backend URL
- [ ] Get production reCAPTCHA keys
- [ ] Generate strong JWT_SECRET
- [ ] Set up database (Railway MySQL or external)
- [ ] Test build locally: `npm run build`

---

## 🔧 Generate JWT Secret

Run this command to generate a secure JWT secret:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output and use it as your `JWT_SECRET`.

---

## ✅ That's It!

Your app should now be live! 🎉

**Need help?** Check the full [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)


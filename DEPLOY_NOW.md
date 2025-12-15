# 🚀 Deploy Your Sahm Project - Step by Step

## ⚡ Fastest Way: Railway (Backend) + Vercel (Frontend)

### Step 1: Prepare Your Code

1. **Make sure your code is on GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Ready for deployment"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

### Step 2: Deploy Backend to Railway (5 minutes)

1. **Go to [railway.app](https://railway.app)** and sign up (use GitHub)

2. **Create New Project** → Click "New Project"

3. **Add MySQL Database:**

   - Click "New" → "Database" → "MySQL"
   - Wait for it to provision
   - **Copy these values** (you'll need them):
     - `MYSQLHOST`
     - `MYSQLUSER`
     - `MYSQLPASSWORD`
     - `MYSQLDATABASE`
     - `MYSQLPORT`

4. **Deploy Backend:**

   - Click "New" → "GitHub Repo" (or "Empty Project")
   - If GitHub: Select your repository
   - **Root Directory:** `zfunds/backend`
   - Railway will auto-detect Node.js

5. **Set Environment Variables:**

   - Click on your backend service → "Variables" tab
   - Click "Raw Editor" and paste:

   ```env
   NODE_ENV=production
   PORT=3001
   DB_HOST=${{MySQL.MYSQLHOST}}
   DB_USER=${{MySQL.MYSQLUSER}}
   DB_PASSWORD=${{MySQL.MYSQLPASSWORD}}
   DB_NAME=${{MySQL.MYSQLDATABASE}}
   JWT_SECRET=YOUR_SECRET_HERE
   ALLOWED_ORIGINS=https://your-frontend.vercel.app
   RECAPTCHA_SECRET_KEY=your-recaptcha-secret
   ```

   - **Generate JWT_SECRET:** Run `node backend/generate-jwt-secret.js` locally
   - **Replace** `YOUR_SECRET_HERE` with the generated secret
   - **Replace** `your-frontend.vercel.app` with your actual Vercel URL (after Step 3)

6. **Import Database Schema:**

   - Click on MySQL database → "Connect" tab
   - Copy the connection string
   - Use a MySQL client (like MySQL Workbench) or Railway's query tab
   - Run the SQL from `backend/database_schema.sql`

7. **Get Backend URL:**
   - Click on backend service → "Settings" → "Generate Domain"
   - Copy the URL (e.g., `https://your-app.railway.app`)

### Step 3: Deploy Frontend to Vercel (3 minutes)

1. **Go to [vercel.com](https://vercel.com)** and sign up (use GitHub)

2. **Import Project:**

   - Click "Add New" → "Project"
   - Import your GitHub repository

3. **Configure Build:**

   - **Framework Preset:** Angular
   - **Root Directory:** `zfunds/zfunds-frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist/zfunds-frontend/browser`
   - **Install Command:** `npm install`

4. **Environment Variables (if needed):**

   - Usually not needed for Angular, but add if you have any

5. **Deploy:**
   - Click "Deploy"
   - Wait for build to complete
   - Copy your Vercel URL (e.g., `https://your-app.vercel.app`)

### Step 4: Update Configuration

1. **Update Frontend API URL:**

   - In your GitHub repo, edit: `zfunds/zfunds-frontend/src/environments/environment.prod.ts`
   - Change:
     ```typescript
     apiUrl: "https://your-backend.railway.app/api";
     ```
   - Replace `your-backend.railway.app` with your actual Railway backend URL
   - Commit and push:
     ```bash
     git add .
     git commit -m "Update production API URL"
     git push
     ```
   - Vercel will auto-redeploy

2. **Update Backend CORS:**

   - Go back to Railway
   - Update `ALLOWED_ORIGINS` variable:
     ```
     ALLOWED_ORIGINS=https://your-app.vercel.app
     ```
   - Replace with your actual Vercel URL
   - Railway will auto-redeploy

3. **Update reCAPTCHA:**
   - Get production keys from [Google reCAPTCHA](https://www.google.com/recaptcha/admin)
   - **Frontend:** Update `zfunds/zfunds-frontend/src/app/services/recaptcha.service.ts`
     ```typescript
     private siteKey: string = 'YOUR_PRODUCTION_SITE_KEY';
     ```
   - **Backend:** Update Railway environment variable:
     ```
     RECAPTCHA_SECRET_KEY=your-production-secret-key
     ```

### Step 5: Test Your Deployment

1. Visit your Vercel frontend URL
2. Try registering a new user
3. Try logging in
4. Test all features

---

## 🎯 Alternative: Deploy Both on Railway

### Backend (same as above)

### Frontend on Railway:

1. In Railway, click "New" → "Service"
2. Select your GitHub repo
3. **Root Directory:** `zfunds/zfunds-frontend`
4. **Build Command:** `npm run build`
5. **Start Command:** `npx serve -s dist/zfunds-frontend/browser -l 3000`
6. Add environment variable: `PORT=3000`
7. Deploy!

---

## 📝 Pre-Deployment Checklist

- [ ] Code is on GitHub
- [ ] Generated JWT secret
- [ ] Got production reCAPTCHA keys
- [ ] Database schema ready
- [ ] Updated `environment.prod.ts` with backend URL
- [ ] Tested build locally: `npm run build`

---

## 🔧 Generate JWT Secret

Run this locally:

```bash
cd zfunds/backend
node generate-jwt-secret.js
```

Copy the output and use it as `JWT_SECRET` in Railway.

---

## ✅ That's It!

Your app will be live at your Vercel URL! 🎉

**Need help?** Check the detailed guide in `DEPLOYMENT_GUIDE.md`

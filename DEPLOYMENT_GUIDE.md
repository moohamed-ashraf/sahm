# 🚀 ZFunds Deployment Guide

Complete guide to deploy your ZFunds application to production.

## 📋 Table of Contents

1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Environment Setup](#environment-setup)
3. [Database Setup](#database-setup)
4. [Backend Deployment](#backend-deployment)
5. [Frontend Deployment](#frontend-deployment)
6. [Platform-Specific Guides](#platform-specific-guides)
7. [Post-Deployment](#post-deployment)

---

## ✅ Pre-Deployment Checklist

- [ ] Update all environment variables
- [ ] Set up production database
- [ ] Configure reCAPTCHA keys for production
- [ ] Update API URLs in frontend
- [ ] Test production build locally
- [ ] Set up SSL/HTTPS
- [ ] Configure CORS for production domain
- [ ] Set up domain names
- [ ] Configure environment variables on hosting platform

---

## 🔧 Environment Setup

### Backend Environment Variables

Create a `.env` file in `zfunds/backend/` with the following:

```env
# Server Configuration
NODE_ENV=production
PORT=3001

# Database Configuration
DB_HOST=your-database-host
DB_USER=your-database-user
DB_PASSWORD=your-database-password
DB_NAME=your-database-name

# JWT Secret (Generate a strong random string)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# CORS Configuration
ALLOWED_ORIGINS=https://your-frontend-domain.com

# reCAPTCHA
RECAPTCHA_SECRET_KEY=your-recaptcha-secret-key
```

### Frontend Environment

Update `zfunds/zfunds-frontend/src/environments/environment.prod.ts`:

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://your-backend-domain.com/api'
};
```

Update reCAPTCHA site key in `recaptcha.service.ts`:

```typescript
private siteKey: string = 'YOUR_PRODUCTION_SITE_KEY';
```

---

## 🗄️ Database Setup

### Option 1: Cloud Database (Recommended)

**Services:**
- **PlanetScale** (MySQL) - Free tier available
- **AWS RDS** (MySQL) - Pay as you go
- **Google Cloud SQL** (MySQL)
- **Azure Database for MySQL**
- **Railway** (MySQL) - Easy setup

### Option 2: Self-Hosted MySQL

1. Set up MySQL server
2. Create database:
   ```sql
   CREATE DATABASE zfunds_production;
   ```
3. Import schema:
   ```bash
   mysql -u username -p zfunds_production < backend/database_schema.sql
   ```

### Database Connection String Format

```
mysql://username:password@host:port/database_name
```

---

## 🖥️ Backend Deployment

### Option A: Railway (Recommended - Easy)

1. **Sign up** at [railway.app](https://railway.app)
2. **Create New Project**
3. **Add MySQL Database:**
   - Click "New" → "Database" → "MySQL"
   - Copy connection details
4. **Deploy Backend:**
   - Click "New" → "GitHub Repo" (or upload code)
   - Select your backend folder
   - Add environment variables in "Variables" tab
   - Railway auto-detects Node.js and starts server

**Railway Environment Variables:**
```
NODE_ENV=production
DB_HOST=your-railway-db-host
DB_USER=root
DB_PASSWORD=your-railway-db-password
DB_NAME=railway
JWT_SECRET=your-jwt-secret
ALLOWED_ORIGINS=https://your-frontend.com
RECAPTCHA_SECRET_KEY=your-secret-key
```

### Option B: Render

1. **Sign up** at [render.com](https://render.com)
2. **Create Web Service:**
   - Connect GitHub repo
   - Root Directory: `zfunds/backend`
   - Build Command: `npm install`
   - Start Command: `node server.js`
   - Environment: Node
3. **Add PostgreSQL Database** (or use external MySQL)
4. **Set Environment Variables**

### Option C: Heroku

1. **Install Heroku CLI**
2. **Login:**
   ```bash
   heroku login
   ```
3. **Create App:**
   ```bash
   cd zfunds/backend
   heroku create your-app-name
   ```
4. **Add MySQL Addon:**
   ```bash
   heroku addons:create cleardb:ignite
   ```
5. **Set Environment Variables:**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set JWT_SECRET=your-secret
   # ... add all other variables
   ```
6. **Deploy:**
   ```bash
   git push heroku main
   ```

### Option D: DigitalOcean App Platform

1. **Create App** on DigitalOcean
2. **Connect GitHub** repository
3. **Configure:**
   - Root Directory: `zfunds/backend`
   - Build Command: `npm install`
   - Run Command: `node server.js`
4. **Add Managed Database** (MySQL)
5. **Set Environment Variables**

### Option E: AWS EC2 / VPS

1. **Set up Ubuntu Server**
2. **Install Node.js:**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```
3. **Install MySQL:**
   ```bash
   sudo apt update
   sudo apt install mysql-server
   ```
4. **Clone Repository:**
   ```bash
   git clone your-repo-url
   cd zfunds/backend
   npm install --production
   ```
5. **Set up PM2:**
   ```bash
   sudo npm install -g pm2
   pm2 start server.js --name zfunds-backend
   pm2 save
   pm2 startup
   ```
6. **Set up Nginx** (reverse proxy):
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:3001;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```
7. **Set up SSL with Let's Encrypt:**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com
   ```

---

## 🌐 Frontend Deployment

### Option A: Vercel (Recommended - Free & Easy)

1. **Sign up** at [vercel.com](https://vercel.com)
2. **Import Project:**
   - Connect GitHub repository
   - Root Directory: `zfunds/zfunds-frontend`
   - Framework Preset: Angular
   - Build Command: `npm run build`
   - Output Directory: `dist/zfunds-frontend/browser`
3. **Environment Variables:**
   - Add any needed variables
4. **Deploy** - Vercel auto-deploys on push

**Vercel Configuration (`vercel.json`):**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist/zfunds-frontend/browser",
  "framework": "angular"
}
```

### Option B: Netlify

1. **Sign up** at [netlify.com](https://netlify.com)
2. **New Site from Git:**
   - Connect repository
   - Base directory: `zfunds/zfunds-frontend`
   - Build command: `npm run build`
   - Publish directory: `dist/zfunds-frontend/browser`
3. **Environment Variables:**
   - Add in Site settings
4. **Deploy**

**Netlify Configuration (`netlify.toml`):**
```toml
[build]
  base = "zfunds/zfunds-frontend"
  command = "npm run build"
  publish = "dist/zfunds-frontend/browser"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Option C: GitHub Pages

1. **Build for production:**
   ```bash
   cd zfunds/zfunds-frontend
   npm run build -- --base-href=/your-repo-name/
   ```
2. **Install gh-pages:**
   ```bash
   npm install -g angular-cli-ghpages
   ```
3. **Deploy:**
   ```bash
   npx angular-cli-ghpages --dir=dist/zfunds-frontend/browser
   ```

### Option D: Firebase Hosting

1. **Install Firebase CLI:**
   ```bash
   npm install -g firebase-tools
   ```
2. **Login:**
   ```bash
   firebase login
   ```
3. **Initialize:**
   ```bash
   cd zfunds/zfunds-frontend
   firebase init hosting
   ```
4. **Build:**
   ```bash
   npm run build
   ```
5. **Deploy:**
   ```bash
   firebase deploy
   ```

### Option E: AWS S3 + CloudFront

1. **Build:**
   ```bash
   npm run build
   ```
2. **Upload to S3:**
   - Create S3 bucket
   - Enable static website hosting
   - Upload `dist/zfunds-frontend/browser` contents
3. **Set up CloudFront:**
   - Create distribution
   - Point to S3 bucket
   - Configure custom domain

---

## 🔄 Platform-Specific Guides

### Full-Stack Deployment (Both on Same Platform)

#### Railway (Full Stack)

1. **Backend:**
   - Deploy as shown above
   - Get backend URL: `https://your-backend.railway.app`

2. **Frontend:**
   - Create new service
   - Root: `zfunds/zfunds-frontend`
   - Build: `npm run build`
   - Start: `npx serve -s dist/zfunds-frontend/browser`
   - Update `environment.prod.ts` with backend URL

#### Render (Full Stack)

1. **Backend:** Deploy as Web Service
2. **Frontend:** Deploy as Static Site
3. **Update frontend API URL** to backend service URL

---

## 📝 Production Build Commands

### Backend

```bash
cd zfunds/backend
npm install --production
# No build needed - Node.js runs directly
```

### Frontend

```bash
cd zfunds/zfunds-frontend
npm install
npm run build -- --configuration production
# Output: dist/zfunds-frontend/browser/
```

---

## 🔒 Security Checklist

- [ ] Use HTTPS (SSL/TLS)
- [ ] Set strong JWT_SECRET (32+ characters)
- [ ] Use production reCAPTCHA keys
- [ ] Enable CORS only for your frontend domain
- [ ] Use environment variables (never commit secrets)
- [ ] Enable Helmet security headers (already configured)
- [ ] Use strong database passwords
- [ ] Regular security updates
- [ ] Enable rate limiting (consider adding)
- [ ] Backup database regularly

---

## 🧪 Testing Production Build Locally

### Test Backend:

```bash
cd zfunds/backend
NODE_ENV=production node server.js
```

### Test Frontend:

```bash
cd zfunds/zfunds-frontend
npm run build -- --configuration production
npx serve -s dist/zfunds-frontend/browser
```

Visit `http://localhost:3000` to test.

---

## 📊 Post-Deployment

### 1. Verify Deployment

- [ ] Backend health check: `https://your-backend.com/api/health`
- [ ] Frontend loads correctly
- [ ] Login/Register works
- [ ] API calls succeed
- [ ] reCAPTCHA works
- [ ] Database connections work

### 2. Monitor

- Set up error tracking (Sentry, LogRocket)
- Monitor server logs
- Set up uptime monitoring (UptimeRobot, Pingdom)
- Database monitoring

### 3. Performance

- Enable CDN for frontend assets
- Enable database connection pooling (already configured)
- Set up caching if needed
- Optimize images

### 4. Backup

- Set up automated database backups
- Store backups securely
- Test restore process

---

## 🆘 Troubleshooting

### Backend Issues

**Port already in use:**
```bash
# Find process using port
lsof -i :3001
# Kill process
kill -9 <PID>
```

**Database connection fails:**
- Check database credentials
- Verify database is accessible
- Check firewall rules
- Verify connection string

**CORS errors:**
- Update `ALLOWED_ORIGINS` in backend
- Check frontend URL matches exactly

### Frontend Issues

**Build fails:**
- Check Node.js version (should be 18+)
- Clear `node_modules` and reinstall
- Check for TypeScript errors

**API calls fail:**
- Verify `environment.prod.ts` has correct API URL
- Check CORS configuration
- Verify backend is running

**Routes not working:**
- Ensure server is configured for SPA (all routes → index.html)
- Check base href configuration

---

## 📚 Additional Resources

- [Angular Deployment Guide](https://angular.io/guide/deployment)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [Express Production Best Practices](https://expressjs.com/en/advanced/best-practice-production.html)

---

## 🎯 Quick Start (Recommended: Railway + Vercel)

1. **Backend on Railway:**
   - Sign up → New Project → Database (MySQL) → Service (Node.js)
   - Upload backend code
   - Add environment variables
   - Deploy

2. **Frontend on Vercel:**
   - Sign up → Import Git Repo
   - Configure build settings
   - Update API URL in `environment.prod.ts`
   - Deploy

3. **Update reCAPTCHA:**
   - Get production keys
   - Update frontend service
   - Update backend environment

4. **Test:**
   - Visit frontend URL
   - Test all features
   - Monitor logs

---

**Good luck with your deployment! 🚀**


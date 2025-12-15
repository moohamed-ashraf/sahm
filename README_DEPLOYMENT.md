# 🚀 Quick Deployment Reference

## Fastest Deployment Path

### 1. Backend → Railway
- Sign up: https://railway.app
- Add MySQL database
- Deploy backend code
- Set environment variables

### 2. Frontend → Vercel  
- Sign up: https://vercel.com
- Import GitHub repo
- Configure build settings
- Deploy

### 3. Update Configuration
- Update `environment.prod.ts` with backend URL
- Update reCAPTCHA keys
- Update CORS in backend

## Files Created

✅ `DEPLOYMENT_GUIDE.md` - Complete deployment guide
✅ `DEPLOY_QUICK_START.md` - Quick 5-minute guide
✅ `backend/.env.example` - Environment variable template
✅ `zfunds-frontend/src/environments/environment.prod.ts` - Production config
✅ `vercel.json` - Vercel configuration
✅ `netlify.toml` - Netlify configuration

## Next Steps

1. Read `DEPLOY_QUICK_START.md` for fastest deployment
2. Or read `DEPLOYMENT_GUIDE.md` for detailed options
3. Generate JWT secret: `node backend/generate-jwt-secret.js`
4. Set up your database
5. Deploy!

Good luck! 🎉


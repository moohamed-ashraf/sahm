# 🚀 Railway Deployment Pack (Sahm)

All files and exact steps to deploy your project on Railway (backend) plus hook the frontend (e.g., Vercel). Keep this folder handy.

---

## 1) Prerequisites

- Git repo: `https://github.com/moohamed-ashraf/sahm.git`
- Railway account
- Production reCAPTCHA keys (site + secret)
- JWT secret (generate below)

---

## 2) Generate JWT secret (run locally once)

```bash
cd zfunds/backend
node generate-jwt-secret.js
```

Copy the output and use it as `JWT_SECRET`.

---

## 3) Backend on Railway

1. Create New Project → Add **MySQL Database**. Copy: MYSQLHOST, MYSQLUSER, MYSQLPASSWORD, MYSQLDATABASE, MYSQLPORT.
2. New → **Deploy from GitHub** → select repo → **Root dir**: `zfunds/backend`.
3. In Service → Variables → Raw Editor, paste and fill:

```
NODE_ENV=production
PORT=3001
DB_HOST=${{MySQL.MYSQLHOST}}
DB_USER=${{MySQL.MYSQLUSER}}
DB_PASSWORD=${{MySQL.MYSQLPASSWORD}}
DB_NAME=${{MySQL.MYSQLDATABASE}}
JWT_SECRET=REPLACE_WITH_YOUR_SECRET
ALLOWED_ORIGINS=https://your-frontend.vercel.app
RECAPTCHA_SECRET_KEY=REPLACE_WITH_YOUR_RECAPTCHA_SECRET
```

4. Import DB schema: open MySQL resource → Query → run `backend/database_schema.sql`.
5. Get backend domain: Service → Settings → Generate Domain (e.g., `https://your-backend.railway.app`).

---

## 4) Frontend (Vercel recommended)

1. Vercel → New Project → repo root `zfunds/zfunds-frontend`.
2. Build: `npm run build` ; Output: `dist/zfunds-frontend/browser`.
3. After deploy, set `ALLOWED_ORIGINS` in Railway to your Vercel URL.
4. Update `zfunds-frontend/src/environments/environment.prod.ts`:

```ts
export const environment = {
  production: true,
  apiUrl: "https://your-backend.railway.app/api", // replace
};
```

Commit & push so Vercel redeploys.

---

## 5) reCAPTCHA (production)

- Frontend `recaptcha.service.ts`: set `siteKey` to your production site key.
- Railway env: `RECAPTCHA_SECRET_KEY` = your production secret.

---

## 6) Test

- Backend health: `https://your-backend.railway.app/api/health`
- Frontend: open Vercel URL; register/login; check console/network for 200s.

---

## 7) One-command reminders

```bash
# set remote (already set)
git remote set-url origin https://github.com/moohamed-ashraf/sahm.git

# push latest
git add .
git commit -m "Deploy prep"
git push origin main
```

---

### Files in this pack

- `backend.env.example` — copy to Railway Variables (filled)
- `frontend.env.example` — reminders for frontend config

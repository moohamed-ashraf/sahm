# 🔒 reCAPTCHA Setup Guide

This guide will help you set up Google reCAPTCHA v2 for your ZFunds application.

## 📋 Prerequisites

- Google account
- Access to Google reCAPTCHA Admin Console

## 🚀 Setup Steps

### 1. Get reCAPTCHA Keys from Google

1. Go to [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
2. Click **"+"** to create a new site
3. Fill in the form:
   - **Label**: ZFunds (or your preferred name)
   - **reCAPTCHA type**: Select **"reCAPTCHA v2"** → **"I'm not a robot" Checkbox**
   - **Domains**: 
     - For development: `localhost`
     - For production: Your domain (e.g., `yourdomain.com`, `www.yourdomain.com`)
   - Accept the reCAPTCHA Terms of Service
   - Click **Submit**

4. You'll receive two keys:
   - **Site Key** (Public) - Used in frontend
   - **Secret Key** (Private) - Used in backend

### 2. Configure Frontend

Update the reCAPTCHA service with your Site Key:

**File**: `zfunds/zfunds-frontend/src/app/services/recaptcha.service.ts`

```typescript
private siteKey: string = 'YOUR_SITE_KEY_HERE'; // Replace with your actual site key
```

### 3. Configure Backend

Add your Secret Key to the backend environment variables:

**File**: `zfunds/backend/.env`

```env
RECAPTCHA_SECRET_KEY=YOUR_SECRET_KEY_HERE
```

Or update the default in:

**File**: `zfunds/backend/utils/verifyCaptcha.js`

```javascript
const secretKey = process.env.RECAPTCHA_SECRET_KEY || 'YOUR_SECRET_KEY_HERE';
```

## 🧪 Testing

### Using Google's Test Keys (Development)

For testing purposes, Google provides test keys that always pass:

- **Site Key**: `6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI`
- **Secret Key**: `6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe`

⚠️ **Note**: These test keys are currently set as defaults. Replace them with your own keys for production!

### Testing the Implementation

1. Start your backend server:
   ```bash
   cd zfunds/backend
   npm start
   ```

2. Start your frontend:
   ```bash
   cd zfunds/zfunds-frontend
   npm start
   ```

3. Navigate to the login or register page
4. You should see the reCAPTCHA checkbox
5. Complete the reCAPTCHA and submit the form
6. The form should submit successfully if reCAPTCHA is verified

## 🔧 How It Works

### Frontend Flow

1. User fills out login/register form
2. reCAPTCHA widget loads automatically
3. User completes reCAPTCHA verification
4. reCAPTCHA generates a token
5. Token is sent to backend with form data

### Backend Flow

1. Backend receives request with captcha token
2. Backend sends token to Google's verification API
3. Google responds with verification result
4. If valid, request proceeds; if invalid, request is rejected

## 📝 Files Modified

### Frontend
- `src/app/services/recaptcha.service.ts` - reCAPTCHA service
- `src/app/pages/login/login.component.ts` - Login component with captcha
- `src/app/pages/login/login.component.html` - Login template with captcha widget
- `src/app/pages/register/register.component.ts` - Register component with captcha
- `src/app/pages/register/register.component.html` - Register template with captcha widget
- `src/app/services/auth.service.ts` - Updated to send captcha token
- `src/index.html` - Added reCAPTCHA script

### Backend
- `backend/utils/verifyCaptcha.js` - Captcha verification utility
- `backend/controllers/userController.js` - Updated login and register to verify captcha

## 🛡️ Security Notes

1. **Never expose your Secret Key** in frontend code or version control
2. Always use environment variables for sensitive keys
3. In production, ensure proper domain validation
4. Consider rate limiting to prevent abuse
5. Monitor reCAPTCHA analytics in Google Console

## 🐛 Troubleshooting

### reCAPTCHA not showing
- Check browser console for errors
- Verify the script is loaded in `index.html`
- Ensure Site Key is correct
- Check domain matches the one registered in Google Console

### Verification always fails
- Verify Secret Key is correct in backend
- Check backend logs for verification errors
- Ensure network can reach Google's API
- In development, check if test keys are being used

### Script loading issues
- Clear browser cache
- Check network tab for script loading
- Verify no ad blockers are interfering

## 📚 Additional Resources

- [Google reCAPTCHA Documentation](https://developers.google.com/recaptcha/docs/display)
- [reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
- [reCAPTCHA Best Practices](https://developers.google.com/recaptcha/docs/best-practices)


const axios = require('axios');

/**
 * Verify reCAPTCHA token with Google
 * @param {string} captchaToken - The reCAPTCHA token from the client
 * @returns {Promise<boolean>} - Returns true if captcha is valid
 */
const verifyCaptcha = async (captchaToken) => {
  // Skip verification in development if no token provided (for testing)
  if (!captchaToken && process.env.NODE_ENV === 'development') {
    console.warn('⚠️  reCAPTCHA verification skipped in development mode');
    return true;
  }

  if (!captchaToken) {
    return false;
  }

  const secretKey = process.env.RECAPTCHA_SECRET_KEY || '6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe'; // Google's test secret key

  try {
    const response = await axios.post('https://www.google.com/recaptcha/api/siteverify', null, {
      params: {
        secret: secretKey,
        response: captchaToken
      }
    });

    const { success, score } = response.data;

    // For reCAPTCHA v2, success is a boolean
    // For reCAPTCHA v3, check score (typically > 0.5 is considered human)
    if (success) {
      if (score !== undefined) {
        // reCAPTCHA v3 - check score
        return score >= 0.5;
      }
      // reCAPTCHA v2 - success is enough
      return true;
    }

    return false;
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    // In development, allow through if verification fails
    if (process.env.NODE_ENV === 'development') {
      console.warn('⚠️  reCAPTCHA verification failed, allowing in development mode');
      return true;
    }
    return false;
  }
};

module.exports = verifyCaptcha;


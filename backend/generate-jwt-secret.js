// Quick script to generate a secure JWT secret
const crypto = require('crypto');
const secret = crypto.randomBytes(32).toString('hex');
console.log('\n🔐 Generated JWT Secret:');
console.log(secret);
console.log('\n📝 Add this to your .env file as:');
console.log(`JWT_SECRET=${secret}\n`);


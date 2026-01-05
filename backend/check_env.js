require('dotenv').config();
console.log('--- ENV CHECK ---');
console.log('CLIENT_ID:', process.env.CLIENT_ID ? 'LOADED' : 'MISSING');
console.log('CLIENT_SECRET:', process.env.CLIENT_SECRET ? 'LOADED' : 'MISSING');
console.log('REDIRECT_URI:', process.env.REDIRECT_URI || 'MISSING');
console.log('-----------------');

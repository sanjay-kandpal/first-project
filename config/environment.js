const fs = require('fs');
const  rfs = require('rotating-file-stream');
const path = require('path');

const logDirectory = path.join(__dirname,'../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log', {
  interval : '1d',
  path: logDirectory
});

const development = {
    name: 'development',
    asset_path: './assets',
    session_cookie_key: "blamsomething",
    db: 'codeial_development',
    smtp: {
     service: 'gmail',
     host: 'smtp.gmail.com',
     port: 587,
     secure: false,
     auth: {
       user: 'sanjaykandpal4@gmail.com',
       pass: 'meenakandpal'
     }
    },
    google_client_ID:  '843097514994-tts8olbpkabrd9fv355d0ojibmck95l6.apps.googleusercontent.com',
    google_client_Secret: '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',
    google_callback_URL: 'http://localhost:8000/users/auth/google/callback',
    jwt_secret: 'codeial',
    morgan: {
      mode: 'development',
      Option: {stream: accessLogStream}
    }
}

const production = {
    name: 'production',
    asset_path: process.env.CODEIAL_ASSET_PATH,
    session_cookie_key: process.env.CODEIAL_COOKIE_KEY,
    db: 'codeial_production',
    smtp: {
     service: 'gmail',
     host: 'smtp.gmail.com',
     port: 587,
     secure: false,
     auth: {
       user: process.env.CODEIAL_USERNAME,
       pass: process.env.CODEIAL_PASS
     }
    },
    google_client_ID:  process.env.GOOGLE_CLIENT_ID,
    google_client_Secret: process.env.GOOGLE_CLIENT_SECRET,
    google_callback_URL: process.env.GOOGLE_CLIENT_URI,
    jwt_secret: process.env.CODEIAL_JWT_SECRET,
    morgan: {
      mode: 'combined',
      Option: {stream: accessLogStream}
    }
}


module.exports = eval(process.env.CODEIAL_ENVIRONMENT) == undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT);

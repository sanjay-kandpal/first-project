

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
    jwt_secret: 'codeial'
}

const production = {
    name: 'production'
}

module.exports = development;

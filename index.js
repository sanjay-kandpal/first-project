/* wron placement of express.urlencoded()
const express = require('express');
const cookieParser = require('cookie-parser');

const db = require('./config/mongoose.js');

const app = express();

const port = 8000;

// use express router
app.use('/',require('./routes'));
// set up the view engine ejs
app.set('view engine','ejs');
app.set('views','./views');
app.use(express.urlencoded());

app.use(cookieParser());
app.use(express.static('assets'))

app.listen(port,function(err){
    if(err){
        console.log('error: ',err);
        console.log(`error: ${err}`);
    }
 console.log(`server is running on port: ${port}`);

})*/
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
//const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');
const 

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));

//app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
//app.set('layout extractStyles', true);
//app.set('layout extractScripts', true);


// use express router


// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// mongo store is used to store the session cookie in the db

app.use(session({
    name: 'codeial',
    // TODO CHANGE THE SECRET BEFORE DEPLOYMENT IN PRODUCITION MODE

    secret: "blamsomething",
    saveUninitiliased: false,
    resave: false,
    cookie: {
        maxAge: (1000*60*100)
    },
    store: MongoStore.create({
        mongoUrl:  'mongodb://localhost/codeial',
        autoRemove: 'disabled'
    })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// use express router
app.use('/', require('./routes'));

app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});

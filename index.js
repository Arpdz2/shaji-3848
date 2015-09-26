var express = require('express')
    , sendEmail = require('./routes/sendEmail.js')
    , bodyParser = require('body-parser');
var app = express();
var dbConfig = require('./routes/db.js');
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var session      = require('express-session');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)

mongoose.connect(dbConfig.url);

require('./routes/passport')(passport);

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/quote', function(request, response) {
  response.render('pages/quote');
});

app.post('/submitQuote', function(request, response) {
    var firstName = request.body.firstName
    var lastName = request.body.lastName
    var streetAddress = request.body.streetAddress
    var city = request.body.city
    var state = request.body.state
    var zipCode = request.body.zipCode
    var phoneNumber = request.body.phoneNumber
    var emailAddress = request.body.emailAddress
    var comments = request.body.comments
    
    sendEmail.sendQuote(firstName, lastName, streetAddress, city, state, zipCode, phoneNumber, emailAddress, comments, function(statusCode, result) {
        console.log("Email sent...");
    })
    response.render('pages/success');
});

require(app, passport);

app.get('/success', function(request, response) {
  response.render('pages/success');
});

app.get('/smallbusiness', function(request, response) {
    response.render('pages/smallbusiness');
    console.log("Rendering small business tab");
});

app.get('/healthplan', function(request, response) {
    response.render('pages/healthplan');
    console.log("Rendering health plan tab");
});

app.get('/loginindex', function(request, response) {
    response.render('pages/loginindex');
    console.log("Rendering loginindex tab");
});

app.get('/login', function(request, response) {
    response.render('pages/login',{ message: req.flash('loginMessage') });
    console.log("Rendering login tab");
});

app.get('/signup', function(req, res) {

    // render the page and pass in any flash data if it exists
    res.render('pages/signup', { message: req.flash('signupMessage') });
});

app.get('/profile', isLoggedIn, function(req, res) {
    res.render('pages/profile', {
        user : req.user // get the user out of session and pass to template
    });
});

app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});


// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

app.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/signup', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));

// process the login form
app.post('/login', passport.authenticate('local-login', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/login', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
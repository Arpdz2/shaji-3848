var express = require('express')
    , sendEmail = require('./routes/sendEmail.js')
    , bodyParser = require('body-parser');
var app = express();
var dbConfig = require('./routes/db.js');
var mongoose = require('mongoose');


app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

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
    response.render('pages/login');
    console.log("Rendering login tab");
});

mongoose.connect(dbConfig.url);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
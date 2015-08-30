var express = require('express')
    , sendEmail = require('./routes/sendEmail.js');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/quote', function(request, response) {
  response.render('pages/quote');
});

app.get('/submitQuote', function(request, response) {
    var firstName = request.query.firstName
    var lastName = request.query.lastName
    var streetAddress = request.query.streetAddress
    var city = request.query.city
    var state = request.query.state
    var zipCode = request.query.zipCode
    var daytimePhone = request.query.daytimePhone
    var eveningPhone = request.query.eveningPhone
    var emailAddress = request.query.emailAddress
    var comments = request.query.comments
    
    sendEmail.sendQuote(firstName, lastName, streetAddress, city, state, zipCode, daytimePhone, eveningPhone, emailAddress, comments, function(statusCode, result) {
        console.log("Email sent...");
    })
    response.render('pages/quote');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
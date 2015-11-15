var express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    morgan       = require('morgan'),
    cookieParser = require('cookie-parser'),
    http = require('http').Server(app),
    io = require('socket.io')(http);

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)


// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/chat', function(req, res){
    res.render('pages/chat');
});

io.on('connection', function(socket){
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });
});


http.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

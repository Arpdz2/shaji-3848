var express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    morgan       = require('morgan'),
    cookieParser = require('cookie-parser'),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    jade = require('jade'),
    engines = require('consolidate');
    ejs = require('ejs');

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
//app.set('view engine', 'ejs');
//app.engine('jade', engines.jade);
//app.engine('ejs', engines.ejs);


app.get('/', function(request, response) {
  response.render('pages/index.ejs');
});

app.get('/chat', function(req, res){
    res.render('pages/chat2.ejs');
});

//io.on('connection', function(socket){
//    socket.on('chat message', function(msg){
//        io.emit('chat message', msg);
//    });
//});

var pseudoArray = ['admin'];
var users = 0; //count the users

io.sockets.on('connection', function (socket) { // First connection
    var socketId = socket.id;
    //client ip
    var clientIp = socket.request.connection.remoteAddress;
    console.log(clientIp);

    users += 1; // Add 1 to the count
    reloadUsers(); // Send the count to all the users
    socket.on('message', function (data) { // Broadcast the message to all
        if(pseudoSet(socket))
        {
            var transmit = {date : new Date().toISOString(), pseudo : socket.nickname, message : data};
            socket.broadcast.emit('message', transmit);
            console.log("user "+ transmit['pseudo'] +" said \""+data+"\"");
        }
    });
    socket.on('setPseudo', function (data) { // Assign a name to the user
        if (pseudoArray.indexOf(data) == -1) // Test if the name is already taken
        {
            if (socket.nickname){
                var pseudo;
                pseudo = socket.nickname;
                var index = pseudoArray.indexOf(pseudo);
                pseudoArray.splice(index, 1);
                console.log(pseudoArray);
            }
            pseudoArray.push(data);
            socket.nickname = data;
            socket.emit('pseudoStatus', 'ok');
            console.log("user " + data + " connected");
            console.log(pseudoArray);
        }
        else
        {
            socket.emit('pseudoStatus', 'error') // Send the error
        }
    });
    socket.on('disconnect', function () { // Disconnection of the client
        users -= 1;
        reloadUsers();
        if (pseudoSet(socket))
        {
            console.log("disconnect...");
            var pseudo;
            pseudo = socket.nickname;;
            var index = pseudoArray.indexOf(pseudo);
            pseudoArray.splice(index, 1);
            console.log(pseudoArray);
            reloadUsers();
        }
    });
});

function reloadUsers() { // Send the count of the users to all
    io.sockets.emit('nbUsers', {"nb": users});
}
function pseudoSet(socket) { // Test if the user has a name
    var test;
    if (socket.nickname == null ) test = false;
    else test = true;
    return test;
}



http.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

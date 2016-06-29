/**
 * Set express application variables
 */
var express = require('express');
var app = express();

/**
 * Set http server variables
 */
var http = require('http');
var server = http.createServer(app);

/**
 * Set io to listen to our server 
 */
var io = require('socket.io').listen(server);

/**
 * Set port we will listen on
 */
var port = process.env.PORT || 5000;

/**
 * Set view engine
 */
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

/**
 * Set public directory
 */
app.use(express.static(__dirname + '/../client'));

/**
 * Set handler for '/' page
 */
app.get('/', function(request, response) {
  response.render('index',{title:'Epic Chat App'});
});

/**
 * Set handler for '/helloworld' page
 */
app.get('/helloworld', function(request, response) {
  response.send('Hello World!');
});

/**
 * Setup our io event handlers
 */
io.sockets.on('connection', function(socket) {
  // Emit initial message to client
  socket.emit('message', 'Welcome to the chat server!');
  // Set handler for when client sends us 'send-msg' event
  socket.on('send-msg', function(data) {
  	// Emit message to all sockets
  	io.sockets.emit('message', data);
  });
});

/**
 * Make server listen to port
 */
server.listen(port, function() {
  console.log("App is running on localhost port:", port);
});

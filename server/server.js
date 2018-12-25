const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server); // Gives you access to a route that accepts incoming connections...
// This is available at */socket.io/socket.io.js

const { generateMessage } = require("./utils/message");

app.use(express.static(publicPath));

io.on('connection', (socket) => { // This is simply to initiate the connection...
  console.log('New user connected.'); // The socket then handles all the other events...

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app.'));
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'A new user has joined the chat.'));

  socket.on('createMessage', (msg, callback) => {    
    console.log('createMessage', msg);
    let { from, text } = msg;
    io.emit('newMessage', generateMessage(from, text)); // This emits an event to every connection.
    callback('This is an acknowledgement from the server.');
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
    socket.broadcast.emit('newMessage', generateMessage('Admin','A user has left the chat.')); // This emits to every connection EXCEPT this one.
  });

 });

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});

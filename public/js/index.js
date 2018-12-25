const socket = io(); // Method available. Initiate connection from client to server.
socket.on('connect', function () {
  console.log('Connected to server.');
});

socket.on('disconnect', function () {
  console.log('Disconnected from server.');
});

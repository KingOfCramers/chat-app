const socket = io(); // Method available. Initiate connection from client to server.
socket.on('connect', function (){
  console.log('Connected to server.');

});

socket.on('newMessage', function(data){
  console.log('New message.', data);
  var li = jQuery(`<li></li>`) // Use jQuery to create an element...
  li.text(`${data.from}: ${data.text}`);
  jQuery('#messages').append(li);
});

socket.on('disconnect', function (){
  console.log('Disconnected from server.');
});

$('#message-form').on('submit', function(e) {
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val() // Any element w/ name attribute === message...
  }, function() {

  });
});
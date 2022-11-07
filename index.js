const socket = io.connect('wss://pinky.uk.to:5000');

var email

function send(){
    email = document.getElementById('textin').value;
    socket.emit('test', email)

}
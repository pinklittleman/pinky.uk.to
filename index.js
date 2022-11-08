const socket = io.connect('wss://pinky.uk.to:5000');

var email, chats = []
var chat = document.getElementById('chat')

function send(){
    console.log('pressed')
    email = document.getElementById('textin').value;
    socket.emit('test', email)
}
    
socket.on('chatlogs',toast)
function toast(data){
    data = 
    document.getElementById('chat').innerHTML = data
    chat.scrollTop = chat.scrollHeight
}

const socket = io.connect('wss://pinky.uk.to:5000');

var email
let chats
var chat = document.getElementById('chat')

function send(){
    email = document.getElementById('textin').value;
    socket.emit('test', email)
}
    
socket.on('chatlogs',toast)
function toast(data){
    console.log(data)
    document.getElementById('chat').innerHTML = data
    chat.scrollTop = chat.scrollHeight
}

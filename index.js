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
    data = chats
    for(let i = 0; i < chats.length; i++){
        document.getElementById('chat').innerHTML = chats[i]
    }
    chat.scrollTop = chat.scrollHeight
}

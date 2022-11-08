const socket = io.connect('wss://pinky.uk.to:5000');

var email
let chats
var chat = document.getElementById('chat')

function send(){
    console.log('pressed')
    email = document.getElementById('textin').value;
    socket.emit('test', email)
}
    
socket.on('chatlogs',toast)
function toast(data){
    console.log(data)
    data
    for(let i = 0; i < data.length; i++){
        document.getElementById('chat').innerHTML = data[i]
    }
    chat.scrollTop = chat.scrollHeight
}

// Minimal amount of secure websocket server and stuff
var fs = require('fs');
var app = require('express')();
// read ssl certificate
var privateKey = fs.readFileSync('/home/pink/ssl-cert/privkey.pem', 'utf8');
var certificate = fs.readFileSync('/home/pink/ssl-cert/fullchain.pem', 'utf8');


var credentials = { key: privateKey, cert: certificate};
var https = require('https')

var httpsServer = https.createServer(credentials, app);
httpsServer.listen(5000);


var io = require('socket.io')(httpsServer);

let chat = []
var d = new Date();          
var n = d.toLocaleString([], { hour12: true});

app.get('/', function(req, res){
    //send the index.html file for all requests
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {

    // log the user that has connected and their socketID
    console.log('a user connected: ' + socket.id);

    socket.on('test',test)

    function test(data){
        console.log(data)
        chat.push(`${n}    ::    ${data}     <br>`)
        socket.broadcast.emit('chatlogs', chat)
        
    }

    socket.on('disconnect', () => {

        // this removes the leaving socket from the list
        console.log('leaving: '+socket.id)
    })
})
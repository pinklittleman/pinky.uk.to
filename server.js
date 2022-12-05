var fs = require('fs');
var app = require('express')();
// read ssl certificate
var privateKey = fs.readFileSync('/home/pink/ssl-cert/privkey.pem', 'utf8');
var certificate = fs.readFileSync('/home/pink/ssl-cert/fullchain.pem', 'utf8');

var credentials = { key: privateKey, cert: certificate};
var https = require('https')

let users = []

//pass in your credentials to create an https server
var httpsServer = https.createServer(credentials, app);
httpsServer.listen(5000);


var io = require('socket.io')(httpsServer);

app.get('/', function(req, res){
    //send the index.html file for all requests
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {

    // log the user that has connected and their socketID
    console.log('a user connected: ' + socket.id);
    users.push(socket.id)

    setInterval(() => {
        socket.emit('newusr', users)
    }, 1000);

    socket.on('movement',movement)

    function movement(data){
        io.emit('newmov',data)
    }
    socket.on('movementstop',stop)

    function stop(data){
        io.emit('stoploop',data)
    }


    socket.on('disconnect', () => {

        // this removes the leaving socket from the list
        console.log('leaving: '+socket.id)
        let pos = users.indexOf(socket.id)
        users.splice(pos,pos+1)
        console.log(users)
    })

})
const fs = require('fs');
const https = require('https');
const WebSocket = require('ws');

const server = https.createServer({
  cert: fs.readFileSync('/home/pink/ssl-cert/fullchain.pem'),
  key: fs.readFileSync('/home/pink/ssl-cert/privkey.pem')
});
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);
    ws.send(`Echo: ${message}`);
  });
});

server.listen(9443);
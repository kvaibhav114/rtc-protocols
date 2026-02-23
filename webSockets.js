const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 3000 });

let clients = [];

server.on('connection', (ws) => {
    console.log('Client connected');
    clients.push(ws);
    
    ws.send(JSON.stringify({ message: 'Welcome! Current time is ' + new Date().toISOString() }));

    ws.on('message', (data) => {
        console.log('Received:', data);
        clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ 
                    message: data,
                    timestamp: new Date().toISOString()
                }));
            }
        });
    });
    
    ws.on('close', () => {
        console.log('Client disconnected');
        clients = clients.filter(client => client !== ws);
    });

    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
    });
});

console.log('WebSocket server running on ws://localhost:3000');
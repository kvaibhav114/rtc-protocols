const http = require('http');

const server = http.createServer((req, res) => {
    if(req.url === '/poll'){
        setTimeout(() => {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({ message: 'Fetched: ' + new Date().toISOString() }));
        }, 3000)
    }
    else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('Not Found');
    }
});

server.listen(3000, () => {   
    console.log('Server is listening on port 3000');
});
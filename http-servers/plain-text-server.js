const http = require('http');
const port = 8080;

http.createServer((req, res) => {
    res.writeHead(200, {'Content-type': 'text/plain'});
    res.end('Hello World!');
}).listen(port, console.log(`Server started on port: ${port}`));

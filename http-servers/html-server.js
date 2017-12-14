const http = require('http');
const fs = require('fs');
const port = 8080;

http.createServer((req, res) => {
    const readFile = fs.readFileSync('./index.html', 'utf8');
    const replaceMessageInFile = readFile.replace(/{message}/, 'Hello World!');
    res.writeHead(200, {'Content-Type': 'text/html, charset=utf8'});
    res.end(replaceMessageInFile);

    fs.createReadStream('./index.html').pipe(res);

}).listen(port, console.log(`Server started on port: ${port}`));

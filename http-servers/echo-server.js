const http = require('http');
const url = require('url');
const port = 8080;

http.createServer((req, res) => {
   const parseUrl = url.parse(req.url, true);
   if(parseUrl.pathname === '/echo' && parseUrl.query.message) {
       req.statusCode = 200;
       res.end(parseUrl.query.message);
   } else {
       req.statusCode = 404;
       res.end('Page not found')
   }
}).listen(port, console.log(`Server started on port: ${port}`));
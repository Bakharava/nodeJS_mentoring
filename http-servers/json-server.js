const http = require('http');
const port = 8080;

const product = {
    id: 1,
    name: 'Supreme T-Shirt',
    brand: 'Supreme',
    price: 99.99,
    options: [
        { color: 'blue' },
        { size: 'XL' }
    ]
};
const convertProductToJSON = JSON.stringify(product);

http.createServer((req, res) => {
    res.writeHead(200, {"Content-Type": "text/json"});
    res.end(convertProductToJSON);

}).listen(port, console.log(`Server started on port: ${port}`));

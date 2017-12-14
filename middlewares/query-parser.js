const express = require('express');
const app = express();

app.use(express.json());

app.use((req, res, next) => {
    req.parsedQuery = req.body;
    next();
});

app.get('/', (res, req) => {
    console.log(`Cookies: ${req.cookies}`)
});

app.listen(8080);
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser());

app.use((req, res, next) => {
    req.parsedCookies = req.cookies;
    next();
});

app.get('/', (res, req) => {
    console.log(`Cookies: ${req.cookies}`)
});

app.listen(8080);

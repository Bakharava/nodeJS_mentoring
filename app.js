const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const city = require('./routes/city');
const user = require('./routes/users');
const product = require('./routes/products');

const app = express();
const port = process.env.PORT || 8080;
const router = express.Router();

mongoose.connect('mongodb://localhost/api', {
    useMongoClient: true,
    keepAlive: 300000,
    connectTimeoutMS: 30000
}, function(err) {
    if (err) {
        console.error('MongoDB connection error: ' + err);
        process.exit(1);
    }});
mongoose.Promise = global.Promise;

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

router.use((req, res, next) => {
    console.log('Something is happening.');
    next();
});

router.get('/', (req, res) => {
        res.json({ message: 'Hooray! welcome to our api!' });
    });

    app.use('/api', router);
    app.use('/api', city);
    app.use('/api', user);
    app.use('/api', product);

    app.listen(port, () => console.log(`App listening on port: ${port}!`));


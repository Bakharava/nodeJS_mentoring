const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/api', {
    useMongoClient: true,
    keepAlive: 300000,
    connectTimeoutMS: 30000
}, function(err) {
    if (err) {
        console.error('MongoDB connection error: ' + err);
        // return reject(err);
        process.exit(1);
    }});
mongoose.Promise = global.Promise;
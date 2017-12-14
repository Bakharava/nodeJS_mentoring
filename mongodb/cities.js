const express = require('express');
const bodyParser = require('body-parser');

const objectId = require('mongodb').ObjectID;
const MongoClient = require('mongodb').MongoClient;
const router = express.Router();

const cities = require('../data/mock-data-cities');

const connectUrl = 'mongodb://localhost:27017/node';

const port = 8080;
const server = express();


server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

// Mongodb and return random city

router
    .route('/cities')
.get((req, res) => {
    MongoClient.connect(connectUrl, (err, db) => {
        let collection = db.collection('cities');
        collection.aggregate(
            [ { $sample: { size: 1 } } ], (err, cities) => {
            res.send(cities);
            db.close();
        })
    });
})
.post((req, res) => {
    MongoClient.connect(connectUrl, (err, db) => {
        let collection = db.collection('cities');
        collection.insertMany(cities, (err, cities) => {
            res.send(cities);
            console.log(cities);
            db.close();
        });
    });
});

server.use('/node', router);

server.listen(port, () => console.log(`Server listening on port: ${port}!`));

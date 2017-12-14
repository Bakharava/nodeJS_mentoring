const express = require('express');
const router = express.Router();

const City = require('../models/cityShema');
const citiesCollection = require('../data/mock-data-cities');

router.use((req, res, next) => {
    console.log('Something is happening.');
    next();
});
//CRUD CITIES_________________________
router
    .route('/cities')
    .post( (req, res) => {
        City.collection.insert(citiesCollection, ((err, cities) => {
            citiesCollection.forEach(city => {
                city.lastModifiedDate = 'create_at ' +  Date.now();
            });
            if (err)
                res.send(err);

            res.json(cities);
        }));

    })
    .get((req, res) => {
        City.find((err, cities) => {
            if (err)
                res.send(err);

            res.json(cities);
        });
    });
router.route('/cities/:id')
    .get((req, res) => {
        City.findById({_id: req.params.id}, (err, city) => {
            if (err)
                res.send(err);
            res.json(city);
        });
    })
    .put((req, res) => {
        City.findById({_id: req.params.id}, (err, city) => {
                if(city) {
                    city.city_name = req.body.city_name || city.city_name;
                    city.lastModifiedDate = 'update_at ' +  Date.now();
                    city.save(function(err) {
                        if (err)
                            res.send(err);
                        res.json(city);
                    });
                } else if (!city) {
                    const newCity = new City({lastModifiedDate: 'create_at ' +  Date.now()});
                    newCity.city_name = req.body.city_name;
                    newCity.city_capital = req.body.city_capital || false;
                    newCity.city_country = req.body.city_country || 'Belarus';
                    newCity.save(function(err, city) {
                        if (err)
                            res.send(err);

                        res.json(city);
                    })
                }
        });
    })
    .delete((req, res) => {
        City.remove({_id: req.params.id}, (err, city) => {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });

module.exports = router;

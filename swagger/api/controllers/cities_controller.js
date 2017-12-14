const City = require('../models/cityShema');
const citiesCollection = require('../mocks/mock-data-cities');

getAllCities = (req, res) => {
    City.find((err, cities) => {
        if (err)
            res.send(err);

        res.json(cities);
    });
};

addCity = (req, res) => {
    City.collection.insert(citiesCollection, ((err, cities) => {
        citiesCollection.forEach(city => {
            city.lastModifiedDate = 'create_at ' +  Date.now();
        });
        if (err)
            res.send(err);

        res.json(cities);
    }));

};

getCityById = (req, res) => {
    const cityId = req.swagger.params.id.value;
    City.findById(cityId, (err, city) => {
        if (err) {
            res.send(err);
        } else if (!city) {
            res.status(404).json({message: 'City not found'})
        } else {
            res.json(city);
        }
    });
};

updateCity = (req, res) => {
    const cityId = req.swagger.params.id.value;
    const cityName = req.swagger.params.city_name.value;
    const lastModifiedDate = 'update_at ' + Date.now();
    City.findById(cityId, (err, city) => {
        if (err) {

            res.send(err);

        } else if (!city) {

            const newCity = new City({lastModifiedDate: 'create_at ' +  Date.now(), city_name: req.swagger.params.city_name.value,});
            newCity.save(cityId, (err, city) => {
                if (err)
                    res.send(err);
                res.json(city);
            });
        } else {
            City.findByIdAndUpdate(cityId, cityName, lastModifiedDate, (err, city) => {
                if (err)
                    res.send(err);
                if(city)
                    res.json(city);
            });
        }
    })
    /*if (cityId){
        City.findByIdAndUpdate(cityId, cityName, lastModifiedDate, (err, city) => {
            if (err)
                res.send(err);
            if(city)
                res.json(city);
        });
    } else {
            const cityId = req.swagger.params.id.value;
            const cityName = req.swagger.params.city_name.value;
            const newCity = new City({lastModifiedDate: 'create_at ' +  Date.now()});
            newCity.save(cityId, cityName, (err, city) => {
                if (err)
                    res.send(err);
                res.json(city);
            })
    }*/
};

deleteCity = (req, res) => {
    const cityId = req.swagger.params.id.value;
    City.findByIdAndRemove(cityId, (err, city) => {
        if (err)
            res.send(err);

        res.json({ message: 'Successfully deleted' });
    });
};

module.exports = {
    getAllCities: getAllCities,
    addCity: addCity,
    getCityById: getCityById,
    updateCity: updateCity,
    deleteCity: deleteCity
};

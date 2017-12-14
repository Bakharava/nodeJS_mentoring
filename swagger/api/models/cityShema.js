const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const CitySchema = new mongoose.Schema({
    city_name: String,
    city_country: {type: String, required: true},
    city_capital: String,
    city_location: {
        lat: Number,
        long: Number
    },
    lastModifiedDate: { type: String, default: Date.now }
});

const City = mongoose.model('City', CitySchema);

module.exports = City;

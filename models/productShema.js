const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    prod_id: Number,
    prod_name: String,
    prod_brand: String,
    prod_company: {type: String, required: true},
    prod_price: String,
    prod_isbn: String,
    lastModifiedDate: { type: String, default: Date.now }
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;

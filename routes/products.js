const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/productShema');
const productsCollection = require('../data/mock-data-products');

//CRUD PRODUCTS_________________________

router
    .route('/products')
    .post( (req, res) => {
Product.collection.insert(productsCollection, ((err, products) => {
    productsCollection.forEach(product => {
        product.lastModifiedDate = 'create_at ' +  Date.now();
    });
    if (err)
        res.send(err);

    res.json(products);
    }));

    })
    .get((req, res) => {
        Product.find((err, products) => {
            if (err)
                res.send(err);

            res.json(products);
        });
    });
router.route('/products/:prod_id')
    .get((req, res) => {
        Product.findById({_id: req.params.prod_id}, (err, product) => {
            if (err)
                res.send(err);
            res.json(product);
        });
    })
    .put((req, res) => {
        Product.findById({_id: req.params.prod_id}, (err, product) => {
            if (err)
                res.send(err);

            product.prod_name = req.body.name || product.prod_name;
            product.lastModifiedDate = 'update_at ' +  Date.now();
            product.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Product updated!' });
            });

        });
    })
    .delete((req, res) => {
        Product.remove({_id: req.params.prod_id}, (err, product) => {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });


module.exports = router;

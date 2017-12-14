const Product = require('../models/productShema');
const productsCollection = require('../mocks/mock-data-products');

getAllProducts = (req, res) => {
    Product.find((err, products) => {
        if (err)
            res.send(err);

        res.json(products);
    });
};

addProduct = (req, res) => {
    const newProduct = Product(req.swagger.params.prod_name.value);
    newProduct.save((err, product) => {
        if (err)
            res.send(err);

        res.json({ message: 'Product created!' + product});
    });
   /* Product.collection.insert(productsCollection, ((err, products) => {
        productsCollection.forEach(product => {
            product.lastModifiedDate = 'create_at ' +  Date.now();
        });
        if (err)
            res.send(err);

        res.json(products);
    }));*/

};

getProductById = (req, res) => {
    const prodId = req.swagger.params.id.value;
    Product.findById(prodId, (err, product) => {
        console.log(product);
        if (err) {
            throw err;
        } else if (!product) {
            res.status(404).json({message: 'Product not found'})
        } else {
            res.json(product);
        }
    });
};

updateProduct = (req, res) => {
    const prodId = req.swagger.params.id.value;
    const prodName = req.swagger.params.prod_name.value;
    const lastModifiedDate = 'update_at ' +  Date.now();
    Product.findByIdAndUpdate(prodId, prodName, lastModifiedDate, (err, product) => {
        if (err)
            res.send(err);

        res.json(product);
        });
};

deleteProduct = (req, res) => {
    const prodId = req.swagger.params.id.value;
    Product.findByIdAndRemove(prodId, (err, product) => {
        if (err) {
            throw err;
        } else if (!product) {
            res.status(404).json({message: 'Product not found'})
        } else {
            res.json({message: 'Successfully deleted'});
        }
    });
};

getProductReviews = (req, res) => {
    const prodId = req.swagger.params.id.value;
    Product.findById(prodId, (err, product) => {
        if (err)
            res.send(err);
        res.json(product.reviews);
    });
};

module.exports = {
    getAllProducts: getAllProducts,
    addProduct: addProduct,
    getProductById: getProductById,
    updateProduct: updateProduct,
    deleteProduct: deleteProduct,
    getProductReviews: getProductReviews
};

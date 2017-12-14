'use strict';

const SwaggerExpress = require('swagger-express-mw');
const SwaggerUi = require('swagger-tools/middleware/swagger-ui');
const app = require('express')();
const mongoose = require('mongoose');
module.exports = app; // for testing

const config = {
  appRoot: __dirname, // required config
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

    app.use(SwaggerUi(swaggerExpress.runner.swagger));
    app.use(function(req, res, next) {

        res.setHeader('Access-Control-Allow-Origin', '*');

        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, UPDATE, DELETE, OPTIONS');

        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        next();

    });

  // install middleware
  swaggerExpress.register(app);

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

  const port = process.env.PORT || 8080;
  app.listen(port);

  if (swaggerExpress.runner.swagger.paths['/hello']) {
    console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott');
  }
});

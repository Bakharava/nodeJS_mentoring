const express = require('express');
const router = express.Router();

const User = require('../models/userShema');
const usersCollection = require('../data/mock-data-users.js');

//CRUD USERS_________________________
router
    .route('/users')
    .post( (req, res) => {
        User.collection.insert(usersCollection, ((err, users) => {
            users.lastModifiedDate = 'create_at ' +  Date.now();
            if (err)
                res.send(err);

            res.json(users);
        }));

    })
    .get((req, res) => {
        User.find((err, users) => {
            if (err)
                res.send(err);

            res.json(users);
        });
    });
router.route('/users/:user_id')
    .get((req, res) => {
        User.findById({_id: req.params.user_id}, (err, user) => {
            if (err)
                res.send(err);
            res.json(user);
        });
    })
    .put((req, res) => {
        User.findById({_id: req.params.user_id}, (err, user) => {
            if (err)
                res.send(err);

            user.user_name = req.body.name || user.user_name;
            user.lastModifiedDate = 'update_at ' +  Date.now();
            user.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'User updated!' });
            });

        });
    })
    .delete((req, res) => {
        User.remove({_id: req.params.user_id}, (err, user) => {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });

module.exports = router;

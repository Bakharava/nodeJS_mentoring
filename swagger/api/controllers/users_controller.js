const User = require('../models/userShema');
const usersCollection = require('../mocks/mock-data-users');

getAllUser = (req, res) => {
    User.find((err, users) => {
        if (err)
            res.send(err);

        res.json(users);
    });
};

addUser = (req, res) => {
    User.collection.insert(usersCollection, ((err, users) => {
        usersCollection.forEach(user => {
            user.lastModifiedDate = 'create_at ' + Date.now();
        });
        if (err)
            res.send(err);

        res.json(users);
    }));

};

getUserById = (req, res) => {
    const userId = req.swagger.params.id.value;
    User.findById(userId, (err, user) => {
        if (err) {
            res.send(err);
        } else if (!user) {
            res.status(404).json({message: 'User not found'})
        } else {
            res.json(user);
        }
    });
};

updateUser = (req, res) => {
    const userId = req.swagger.params.id.value;
    const userName = req.swagger.params.user_firstName.value;
    const lastModifiedDate = 'update_at ' + Date.now();
    User.findByIdAndUpdate(userId, userName, lastModifiedDate, (err, user) => {
        if (err)
            res.send(err);

        res.json(user);
    });
};

deleteUser = (req, res) => {
    const userId = req.swagger.params.id.value;
    User.findByIdAndRemove(userId, (err, user) => {
        if (err) {
            res.send(err);
        } else if (!user) {
            res.status(404).json({message: 'User not found'})
        } else {
            res.json({message: 'User successfully deleted'});
        }
    });
};

module.exports = {
    getAllUser: getAllUser,
    addUser: addUser,
    getUserById: getUserById,
    updateUser: updateUser,
    deleteUser: deleteUser
};

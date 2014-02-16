/**
 * Created by Ricter on 14-2-15.
 */

var db = require('./../modules/db'),
    User = require('../models/users');

function Authorization() {
    //Nothing
}

Authorization.auth = function(req, res, next) {
    token = req.headers.authorization;
    if (!token) {
        return res.json(401, {message: "You need Authorization in headers"});
    };
    db.open(function(err, db) {
        if (err) {
            return res.json(500, {error: err});
        };
        db.collection('users', function(err, collection) {
            if (err) {
                db.close();
                return res.json(500, {error: err});
            };
            collection.findOne({
                token: token
            }, function(err, user) {
                db.close();
                if (err) {
                    return res.json(500, {error: err});
                };
                if (!user) {
                    return res.json(401, {message: "Authorization Failed"});
                };
                next();
            });
        });
    });
};

Authorization.get_token = function(req, res) {
    user = new User({
        username: req.body.username,
        password: req.body.password
    });
    user.login(function(err, token) {
        if (err) {
            res.json(500, {message: err});
        }
        if (token) {
            res.json(200, {token: token});
        } else {
            res.json(401, {message: "Authorization failed"});
        }
    });
};


Authorization.getAllUsers = function (req, res) {
    User.getAll(function(err, users) {
        if (err) {
            res.json(500, {message: err});
        }
        res.json(200, users);
    })
}


module.exports = Authorization;
/**
 * Created by Ricter on 14-2-12.
 */


var db = require('../modules/db'),
    crypto = require('crypto'),
    datetime = require('../modules/datetime');


function User(user) {
    var hash = crypto.createHash('md5');
    this.username = user.username;
    this.password = hash.update(user.password).digest('hex');
}


User.prototype.login = function(callback) {
    var login_user = {
        username: this.username,
        password: this.password,
        token: ''
    };
    db.open(function(err, db) {
        if (err) {
            return callback(err);
        };
        db.collection('users', function(err, collection) {
            if (err) {
                db.close();
                return callback(err);
            };
            collection.findOne({
                username: login_user.username
            }, function(err, user) {
                if (err) {
                    db.close();
                    return callback(err);
                };
                if (!user) {
                    db.close();
                    return callback(false);
                };
                if (user.password==login_user.password) {
                    var token = crypto.randomBytes(30).toString('base64');
                    collection.update({
                        username: user.username
                    }, {
                        $set: {
                            token: token
                        }
                    }, function(err, user) {
                        db.close();
                        if (err) {
                            return callback(err);
                        };
                        return callback(null, token);
                    });
                } else {
                    db.close();
                    return callback(null);
                };
            });
        });
    });
};


User.prototype.reg = function(callback) {
    var now = new datetime(),
            user = {
            username: this.username,
            password: this.password,
            created_time: now.Format("yyyy-MM-dd hh:mm:ss")
        };
    db.open(function(err, db) {
        if (err) {
            return callback(err);
        };
        db.collection('users', function(err, collection) {
            if (err) {
                db.close();
                return callback(err);
            };
            collection.insert({
                username: user.username,
                password: user.password,
                created_time: user.created_time
            }, function(err, user) {
                db.close();
                if (err) {
                    return callback(err);
                };
                callback(err, user);
            })
        })
    })
}


User.getAll = function(callback) {
    db.open(function(err, db) {
        if (err) {
            return callback(err);
        };

        db.collection('users', function(err, collection) {
            if (err) {
                db.close();
                return callback(err);
            };
            collection.find({}).sort({
                _id: -1
            }).toArray(
                function(err, users) {
                    db.close();
                    if (err) {
                        return callback(err);
                    };
                    callback(null, users);
                }
            );
        });
    });
};


module.exports = User;
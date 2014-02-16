/**
 * Created by Ricter on 14-2-9.
 */

var db = require('../modules/db'),
    BSON = require('mongodb').BSONPure,
    datetime = require('../modules/datetime');


function Article(article) {
    this.title = article.title;
    this.content = article.content;
    this.tags = article.tags.split(',');
};


Article.prototype.save = function(callback) {
    var article = {
        title: this.title,
        content: this.content,
        tags: this.tags,
        published_date: datetime.Format("yyyy-MM-dd hh:mm:ss")
    };

    db.open(function(err, db) {
        if (err) {
            return callback(err);
        }
        db.collection('articles', function(err, collection) {
            if (err) {
                db.close();
                return callback(err);
            }
            collection.insert(article, {
                safe: true
            }, function(err, article) {
                db.close();
                if (err) {
                    return callback(err);
                }
                callback(null, article[0]);
            });
        });
    });
};



Article.update = function(id, title, tags, content, callback) {
    db.open(function(err, db) {
        if (err) {
            return callback(err);
        };
        db.collection('articles', function(err, collection) {
            if (err) {
                db.close();
                return callback(err);
            }
            try {
                var _id = BSON.ObjectID.createFromHexString(id);
            } catch(e) {
                db.close();
                return callback();
            }
            try {
                tags = tags.split(',');
            } catch (e) {
                return callback(e.message);
            }
            if (!title) {
                return callback("Title can't be null.")
            }
            collection.update({
                _id: _id
            }, {
                $set: {
                    title: title,
                    tags: tags,
                    content: content
                }
            },function(err, article) {
                db.close();
                if (err) {
                    return callback(err);
                }
                callback(null, article);
            });
        });
    });
};


Article.get = function(id, callback) {
    db.open(function(err, db) {
        if (err) {
            return callback(err);
        }
        db.collection('articles', function(err, collection) {
            if (err) {
                db.close();
                return callback(err);
            }
            try {
                var _id = BSON.ObjectID.createFromHexString(id);
            } catch (e) {
                db.close();
                return callback(e.message);
            }
            collection.findOne({
                _id: _id
            }, function(err, article) {
                db.close();
                if (err) {
                    return callback(err);
                }
                callback(null, article);
            });
        });
    });
};


Article.remove = function(id, callback) {
    db.open(function(err, db) {
        if (err) {
            return callback(err);
        }
        db.collection('articles', function(err, collection) {
            if (err) {
                db.close();
                return callback(err);
            }
            try {
                var _id = BSON.ObjectID.createFromHexString(id);
            } catch (e) {
                db.close();
                return callback(e);
            }
            collection.remove({
                _id: _id
            }, function(err) {
                db.close();
                if (err) {
                    return callback(err);
                }
                callback(null);
            });
        });
    });
};


Article.getAll = function(callback) {
    db.open(function(err, db) {
        if (err) {
            return callback(err);
        };
        db.collection('articles', function (err, collection) {
            if (err) {
                db.close();
                return callback(err);
            }
            collection.find({}).sort({
                publish_date: -1
            }).toArray(function(err, articles_list) {
                db.close();
                if (err) {
                   return callback(err);
                }
                callback(null, articles_list);
            });
        });
    });
};


module.exports = Article;
/**
 * Created by Ricter on 14-2-15.
 */

function Tag(tag) {
    this.name = tag.name;
}


Tag.prototype.save = function(callback) {
    var tag = {
        name: this.name
    };

    db.open(function(err, db) {
        if (err) {
            return callback(err);
        }
        db.collection('tags', function(err, collection) {
            if (err) {
                db.close();
                return callback(err);
            }
            collection.findOne({
                name: tag.name
            }, function(err, tag) {
                if (err) {
                    return callback(err);
                }
                if (tag) {
                    return callback(null);
                }
            });
            collection.insert({
                name: tag.name
            }, function(err) {
                if (err) {
                    return callback(err);
                }
                callback(null);
            })
        })
    })
};


/**
 * Created by Ricter on 14-2-16.
 */

var User = require('./models/users'),
    Article = require('./models/articles'),
    user = new User({
        username: 'rixb',
        password: 'admin'
    });
    article = new Article({
        title: 'Hello World',
        tags: 'rixb,hello',
        content: '##rixb' +
            'Just a Node.js Blog'
    });


user.reg(function(err, user) {
    console.log("Create a new user.");
    if (err) {
        console.log("[ERROR] " + err);
        console.log("Failed");
        return;
    }
    console.log("User Created!");
    callback();
});

function callback() {
    article.save(function(err, article) {
        console.log("Create a article.");
        if (err) {
            console.log("[ERROR] " + err);
            console.log("Failed");
            return;
        }
        console.log("Article Posted!");
    });
}


console.log("All Done.");
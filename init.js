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
        content: '#nichijou\n' +
            'Just a Node.js Blog, clean, lightweight and elegance.  \n' +
            '##Who am I?\n' +
            '`Node.js` is good, JavaScript is good! And this sentence is a long sentence, for the long sentence test.\n' +
            '##List\n' +
            '\n' +
            '+ Item 1\n' +
            '+ Item 2\n' +
            '+ Item 3! And this sentence is a long sentence.\n' +
            '\n' +
            '##Code' +
            '\n' +
            '    function Article (article) {\n' +
            '        this.title = article.title\n' +
            '        this.content = article.content\n' +
            '    }\n' +
            '    ' +
            '\n' +
            '##Quote\n' +
            '> This is a quote!\n\n' +
            '> And is very good, is\'t?\n\n' +
            '> I like Node.js. This is a long sentence, for the long sentence test.\n' +
            '##Test over!'
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
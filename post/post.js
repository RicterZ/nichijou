var Article = require('../models/articles'),
    fs = require('fs');


fs.readFile('article.md', function(err, data) {
    if (err) {
        console.log(err);
        return;
    }
    raw_data = data.toString().split('\n').reverse();
    title = raw_data.pop();
    tags = raw_data.pop();
    content = raw_data.reverse().join("\n");
    article = new Article({
        title: title,
        tags: tags,
        content: content
    });
    article.save(function(err, article) {
        if (err) {
            console.log(err.toString());
            return;
        }
        fs.unlink('article.md', function(err) {
            if (err) {
                console.log(err.toString());
                return;
            }
        });
        console.log(article.title + ' post successfully');
    })
});
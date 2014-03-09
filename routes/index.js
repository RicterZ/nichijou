var Auth = require('../controller/authorization'),
    ArticleHandler = require('../controller/articles'),
    PageHandler = require('../controller/page'),
    fs = require('fs'),
    index_page = fs.readFileSync('./public/index.html', 'binary');


// Auth.auth is a middleware of Token Authorization.

module.exports = function(app) {
    // router of index
    app.get('/', function(req, res){res.end(index_page);});
    app.get('/pages/:id', PageHandler.show_page);

    // router of /article
    app.post('/articles', Auth.auth, ArticleHandler.add_article);

    // router of /article/(.*)
    app.put('/articles/:id', Auth.auth, ArticleHandler.modify_article);
    app.get('/articles/:id', ArticleHandler.get_a_article);
    app.delete('/articles/:id', Auth.auth, ArticleHandler.remove_article);

    // router of /archives
    app.get('/archives', ArticleHandler.get_archives);

    // router of /tags/(.*)
    app.get('/tags/:name', ArticleHandler.get_articles_by_tag);

    // router of /api-auth
    app.post('/api-auth', Auth.get_token);
    //app.get('/users', Auth.getAllUsers);
};
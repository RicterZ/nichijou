var Auth = require('../controller/authorization'),
    ArticleHandler = require('../controller/articles'),
    PageHandler = require('../controller/page');


// Auth.auth is a middleware of Token Authorization.

module.exports = function(app) {
    // router of index
    app.get('/', function(req, res){res.redirect('/index.html')});
    app.get('/pages/:id', PageHandler.show_page);

    // router of /article
    //app.get('/articles', ArticleHandler.list_articles);
    app.post('/articles', Auth.auth, ArticleHandler.add_article);

    // router of /article/(.*)
    app.put('/articles/:id', Auth.auth, ArticleHandler.modify_article);
    app.get('/articles/:id', ArticleHandler.get_a_article);
    app.delete('/articles/:id', Auth.auth, ArticleHandler.remove_article);

    // router of /archives
    app.get('/archives', ArticleHandler.get_archives);

    // router of /api-auth
    app.post('/api-auth', Auth.get_token);
    app.get('/users', Auth.getAllUsers);
};
/**
 * Created by Ricter on 14-3-2.
 */
var Article = require('../models/articles');


function PageHandler() {
    //Page Handler
}

PageHandler.show_page = function(req, res) {
    Article.getAll(req.param('id'), function(err, articles_list) {
        if (err) {
            res.json(500, {message: err});
        }
        res.json(200, {articles: articles_list, page: parseInt(req.param('id'))});
    })
};


module.exports = PageHandler;
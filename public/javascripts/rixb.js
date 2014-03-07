/**
 * Created by Ricter on 14-1-23.
 */

var rixb = {
    _this: this,
    models: {
        auth_token: localStorage.getItem('token'),
        get: function(id, callback) {
            $.ajax({
                type: "GET",
                url: "/articles/" + id,
                dataType: "json",
                success: function(data) {
                    callback(data);
                }
            })
        },
        page: function(id, callback) {
            $.ajax({
                type: "GET",
                url: "/pages/" + id,
                dataType: "json",
                success: function(data) {
                    callback(data);
                }
            })
        },
        post: function(title, tags, content) {
            var _this = this;
            $.ajax({
                type: "POST",
                url: "/articles",
                data: {"title": title, "content": content, "tags": tags},
                dataType: "json",
                success: function(data) {
                    console.log(data);
                },
                headers: {
                    'Authorization': _this.auth_token
                }
            })
        },
        put: function(id, title, tags, content) {
            var _this = this;
            $.ajax({
                type: "PUT",
                url: "/articles/" + id,
                data: {"title": title, "content": content, "tag": tags},
                dataType: "json",
                success: function(data) {
                    console.log(data);
                },
                headers: {
                    'Authorization': _this.auth_token
                }
            })
        },
        delete: function(id) {
            var _this = this;
            $.ajax({
                type: "DELETE",
                url: "/articles/" + id,
                dataType: "json",
                success: function(data) {
                    console.log(data);
                },
                headers: {
                    'Authorization': _this.auth_token
                }
            })
        },
        login: function(u, p) {
            var _this = this;
            $.ajax({
                type: "POST",
                url: "/api-auth",
                dataType: "json",
                data: {"username": u, "password": p},
                success: function(data) {
                    _this.auth_token = data.token;
                    localStorage.setItem('token', data.token);
                },
                error: function(data) {
                    console.log(data);
                }
            })
        }
    },
    controllers: {
        index: function(page) {
            if (page[0] === undefined) {
                page[0] = 0;
            }
            window.rixb.models.page(page, function(articles) {
                window.rixb.views.articles_list(articles);
            })
        },
        article: function(article_id) {
            window.rixb.models.get(article_id, function(data) {
                window.rixb.views.article(data);
            });
        },
        router: function() {
            var urls = window.location.hash.split('?')[0].split('/'),
                route = urls.shift();
            window.rixb.router[route]()(urls);
        }
    },
    views: {
        articles_list: function(articles) {
            var container = $(".container");
            container.html("");
            articles.articles.forEach(function(article) {
                container.append("<article class='article'><h2 class='center'><a href='#!articles/" + article._id + "'>" + article.title +
                    "</a></h2><time class='center' datetime='" + article.published_date + "'>" + article.published_date +
                    "</time><p class='center'>" + article.tags.join() + "</p><article>" + article.content + "</article>");
            });
            var prev_page = articles.page - 1,
                next_page = articles.page + 1,
                prev = "",
                next = "";
            if (prev_page >= 0) {
                prev = "<a class='prev' href='/#!pages/" + prev_page + "'>Prev</a>";
            }
            if (articles.articles.length === 3) {
                next = "<a class='next' href='/#!pages/" + next_page + "'>Next</a></div>";
            }
            container.append("<div class='paging'>" + prev + next + "</div>");
        },
        article: function(article) {
            $(".container").html("<article class='article'><h2 class='center'><a href='#!articles/" + article._id + "'>" + article.title +
                                 "</a></h2><time class='center' datetime='" + article.published_date + "'>" + article.published_date +
                                 "</time><p class='center'>" + article.tags.join() + "</p><article>" + article.content + "</article>")
        }
    },
    router: {
        '#!articles': function() {return window.rixb.controllers.article},
        '#!pages': function() {return window.rixb.controllers.index},
        '': function(){return window.rixb.controllers.index}
    }
};

$(window).on('hashchange', function() {
    rixb.controllers.router();
})

$(window).on('load', function() {
    rixb.controllers.router();
})
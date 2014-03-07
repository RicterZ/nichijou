/**
 * Created by Ricter on 14-3-7.
 */

var services = angular.module('rixb.services', ['ngResource']);

services.factory('Post', ['$resource',
    function($resource) {
        return $resource('/articles/:id', {id: '@id'});
    }
]);


services.factory('Page', ['$resource',
    function($resource) {
        return $resource('/pages/:id', {id: '@id'});
    }
]);


services.factory('Archive', ['$resource',
    function($resource) {
        return $resource('/archives');
    }
]);


services.factory('PostsLoader', ['Page', '$route', '$q',
    function(Post, $route, $q) {
        return function() {
            var delay = $q.defer();
            id = $route.current.params.id;
            Post.get({id: id===undefined?0:id}, function(posts) {
                delay.resolve(posts);
            }, function() {
                delay.reject('Unable to fetch posts');
            });
            return delay.promise;
        }
    }
]);


services.factory('PostLoader', ['Post', '$route', '$q',
    function(Post, $route, $q) {
        return function() {
            var delay = $q.defer();
            Post.get({id: $route.current.params.id}, function(post) {
                delay.resolve(post);
            }, function() {
                delay.reject('Unable to fetch post');
            });
            return delay.promise;
        }
    }
]);


services.factory('ArchiveLoader', ['Archive', '$q',
    function(Archive, $q) {
        return function() {
            var delay = $q.defer();
            Archive.query(function(archives) {
                delay.resolve(archives);
            }, function() {
                delay.reject('Unable to fetch archives');
            });
            return delay.promise;
        }
    }
]);
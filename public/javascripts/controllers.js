/**
 * Created by Ricter on 14-3-7.
 */
window.disqus_shortname = 'ricter-nichijou'; // The Disqus shortname


var app = angular.module('rixb', ['rixb.services', 'ngRoute', 'ngSanitize', 'ngDisqus']);


app.controller('ListCtrl', ['$scope', '$rootScope', 'posts',
    function($scope, $rootScope, posts) {
        $rootScope.title = 'Welcome';
        $scope.posts = posts;
    }
]);


app.controller('DetailCtrl', ['$scope', '$rootScope', 'post',
    function($scope, $rootScope, post) {
        $rootScope.title = post.title;
        $scope.post = post;
    }
]);


app.controller('ArchiveCtrl', ['$scope', '$rootScope', 'archives',
    function($scope, $rootScope, archives) {
        $rootScope.title = 'Archives';
        $scope.archives = archives;
    }
]);



app.config(['$routeProvider', '$locationProvider', '$disqusProvider', function($routeProvider, $locationProvider, $disqusProvider) {
    $disqusProvider.setShortname('ricter-nichijou');
    $locationProvider.hashPrefix('!');
    $routeProvider.
        when('/', {
            controller: 'ListCtrl',
            resolve: {
                posts: function(PostsLoader) {
                    return PostsLoader();
                }
            },
            templateUrl: '/templates/list.html'
        }).
        when('/posts/:id', {
            controller: 'DetailCtrl',
            resolve: {
                post: function(PostLoader) {
                    return PostLoader();
                }
            },
            templateUrl: '/templates/detail.html'
        }).
        when('/pages/:id', {
            controller: 'ListCtrl',
            resolve: {
                posts: function(PostsLoader) {
                    return PostsLoader();
                }
            },
            templateUrl: '/templates/list.html'
        }).
        when('/archives', {
            controller: 'ArchiveCtrl',
            resolve: {
                archives: function(ArchiveLoader) {
                    return ArchiveLoader();
                }
            },
            templateUrl: '/templates/archives.html'
        }).
        when('/tags/:id', {
            controller: 'ListCtrl',
            resolve: {
                posts: function(TagPostsLoader) {
                    return TagPostsLoader();
                }
            },
            templateUrl: '/templates/list.html'
        }).
        when('/manager/', {
            controller: 'ArchiveCtrl',
            resolve: {
                archives: function(ArchiveLoader) {
                    return ArchiveLoader();
                }
            },
            templateUrl: '/templates/manager.html'
        })
}]);

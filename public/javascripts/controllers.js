/**
 * Created by Ricter on 14-3-7.
 */

var rixbServices = angular.module('rixb', []);

function postRouteConfig($routeProvider) {
    $routeProvider.
    when('/', {
        controller: ListController,
        templateUrl: '/templates/list.html'
    }).
    when('/posts/:id', {
        controller: DetailController,
        templateUrl: '/templates/detail.html'
    }).
    when('/archives', {
        controller: ArchiveController,
        templateUrl: '/templates/archives.html'
    })
}

rixbServices.config(postRouteConfig);


articles = [
    {
        "_id": "5319a3a304711c1f092ccf03",
        "content": "<p>用Node.js写一个blog果真是比较坑的。  <br/>折腾了这么久，这个Demo还没做完....不过也罢，玩玩新东西还是蛮不错的。  <br/>写论坛的梦已经破灭了，我也不写了=_=。嘛....</p>",
        "published_date": "2014-03-07 05:46:59",
        "tags": [
            "吐槽而已"
        ],
        "title": "结果买了moeloli.me这个域名还是没啥用，先挂着我的Blog好了.."
    },
    {
        "_id": "5319a3a304711c1f092ccf03",
        "content": "<p>用Node.js写一个blog果真是比较坑的。  <br/>折腾了这么久，这个Demo还没做完....不过也罢，玩玩新东西还是蛮不错的。  <br/>写论坛的梦已经破灭了，我也不写了=_=。嘛....</p>",
        "published_date": "2014-03-07 05:46:59",
        "tags": [
            "吐槽而已"
        ],
        "title": "结果买了moeloli.me这个域名还是没啥用，先挂着我的Blog好了.."
    }
];


function ListController($scope) {
    $scope.articles = articles;
}


function DetailController($scope, $routeParams) {
    $scope.article = articles[$routeParams.id];
}

function ArchiveController($scope) {

}
'use strict';

angular.module('issueTracker.users', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/user', {
            templateUrl: 'views/user/login.html',
            controller: 'UsersController'
        });
    }])

    .controller('UsersController', ['$scope', function($scope) {

    }]);
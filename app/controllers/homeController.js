'use strict';

angular.module('issueTracker.home', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'views/home/main.html',
            controller: 'HomeController'
        });
    }])

    .controller('HomeController', ['$scope', function($scope) {
        if(!sessionStorage['userId']){
            $scope.menu = 'views/home/notLogged-menu.html'
        }
        if(!$scope.template){
            $scope.template = 'views/home/welcome.html';
        }

        $scope.login = function() {
            $scope.template = "views/user/login.html";
        };

        $scope.register = function() {
            $scope.template = "views/user/register.html";
        };

    }]);
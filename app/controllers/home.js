'use strict';

angular.module('issueTracker.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'views/home/anonymous.html',
        controller: 'HomeController'
    });
}])

.controller('HomeController', ['$scope', function($scope) {

    $scope.login = function() {
        $scope.template = "views/home/login.html";
    };

    $scope.register = function() {
        $scope.template = "views/home/register.html";
    };

}]);
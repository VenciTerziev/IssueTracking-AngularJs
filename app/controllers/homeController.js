'use strict';

angular.module('issueTracker.home', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'views/home/main.html',
            controller: 'HomeController'
        });
    }])

    .controller('HomeController', [
        '$scope',
        'authentication',
        'notifications',
        '$location',
        function($scope, authentication, notifications, $location) {
            if(!sessionStorage['userToken']){
                $scope.menu = 'views/home/notLogged-menu.html';
            } else {
                $scope.menu = 'views/home/logged-menu.html';
            }

            if(!$scope.template){
                $scope.template = 'views/home/welcome.html';
            }

            $scope.home = function () {
                $scope.template = "views/home/welcome.html";
            };

            $scope.login = function() {
                $scope.template = "views/user/login.html";
            };

            $scope.register = function() {
                $scope.template = "views/user/register.html";
            };

            $scope.logout = function() {
                sessionStorage.clear();
            };

            $scope.prepareLogin = function (user) {
                var user1 = {
                    username: user.username,
                    password: user.password
                };

                authentication.login(user1)
                    .then(function (success) {
                        sessionStorage['userToken'] = success.data['access_token'];
                        sessionStorage['username'] = success.data['userName'];
                        notifications.showSuccess({message: 'Logged in!'});
                    }, function (error) {
                        console.log(error);
                    })
             }
        }
        ]);
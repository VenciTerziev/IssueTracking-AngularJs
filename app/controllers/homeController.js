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
                $scope.menu = 'views/home/default/menu.html';
            } else {
                $scope.menu = 'views/home/logged/menu.html';
                $scope.username = sessionStorage['username'];
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
                $location.path('/#/');
                notifications.showSuccess({message: 'Logged out.'})
            };

            $scope.prepareLogin = function (user) {
                authentication.login(user)
                    .then(function (success) {
                        sessionStorage['userToken'] = success.data['access_token'];
                        sessionStorage['username'] = success.data['userName'];
                        notifications.showSuccess({message: 'Logged in!'});
                        $location.path('/#/');
                    }, function (error) {
                        console.log(error);
                    })
             };

            $scope.prepareRegister = function (user) {
                authentication.register(user)
                    .then(function (success) {
                        authentication.login(user)
                            .then(function (loginSuccess) {
                                sessionStorage['userToken'] = loginSuccess.data['access_token'];
                                sessionStorage['username'] = loginSuccess.data['userName'];
                                notifications.showSuccess({message: 'Successfully registered!'})
                                $location.path('/#/');
                            })
                    }, function (error) {
                        console.log(error);
                    })
            }
        }
        ]);
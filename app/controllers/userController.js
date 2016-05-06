'use strict';

angular.module('issueTracker.users', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/user', {
            templateUrl: 'views/user/login.html',
            controller: 'UsersController'
        });

        $routeProvider.when('/profile/password/', {
            templateUrl: 'views/user/changePassword.html',
            controller: 'ChangePasswordController'
        });
    }])

    .controller('UsersController', ['$scope', '$location' ,'$window' , 'notifications', 'authentication',
        function($scope, $location, $window, notifications, authentication) {
            $scope.prepareLogin = function (user) {
                authentication.login(user)
                    .then(function (success) {
                        sessionStorage['userToken'] = success.data['access_token'];
                        sessionStorage['username'] = success.data['userName'];
                        notifications.showSuccess({message: 'Logged in!'});
                        $location.path('/');
                        $window.location.reload();
                    }, function (error) {
                        notifications.showError({message: error.data.error_description});
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
                                notifications.showSuccess({message: 'Successfully registered!'});
                                $location.path('/');
                                $window.location.reload();
                            })
                    }, function (error) {
                        var errors = error.data.ModelState;
                        for(var e in errors){
                            notifications.showError(errors[e][0]);
                        }
                    })
            };

            $scope.logout = function() {
                authentication.logout()
                    .then(function (success) {
                        sessionStorage.clear();
                        $location.path('/app/#/');
                        setTimeout(function() {
                            $window.location.reload();
                        }, 100);
                        notifications.showSuccess({message: 'Logged out.'})
                    });

            };
        }
    ])
    .controller('ChangePasswordController', ['$scope', function ($scope) {
        $scope.username = sessionStorage['username'];
    }]);

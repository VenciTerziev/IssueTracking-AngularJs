'use strict';

angular.module('issueTracker.userModel', [])
    .factory('authentication', ['$http', '$q', 'Base_Url', function ($http, $q, Base_Url) {

        function getUserToken(user) {
            var deferred = $q.defer();

            var userInfo = "username=" + user.username + "&password=" + user.password + "&grant_type=password";

            $http({
                method: 'POST',
                url: Base_Url + 'api/Token',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: userInfo
            })
                .then(function (success) {
                    deferred.resolve(success);
                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function register(user){
            var deferred = $q.defer();

            var data = {
                Email: user.username,
                Password: user.password,
                ConfirmPassword: user.confirmPassword
            };

            $http({
                method: 'POST',
                url: Base_Url + 'api/Account/Register',
                data: data
            })
                .then(function (success) {
                    deferred.resolve(success);
                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function logout(){
            var deferred = $q.defer();

            $http({
                method: 'POST',
                url: Base_Url + 'api/Account/Logout',
                headers: {'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: 'Bearer ' + sessionStorage['userToken']}
            })
                .then(function (success) {
                    deferred.resolve(success);
                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function me(){
            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: Base_Url + 'Users/me',
                headers: {Authorization: 'Bearer ' + sessionStorage['userToken']}
            })
                .then(function (success) {
                    deferred.resolve(success);
                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function all(){
            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: Base_Url + 'Users',
                headers: {Authorization: 'Bearer ' + sessionStorage['userToken']}
            })
                .then(function (success) {
                    deferred.resolve(success);
                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function changePassword(password) {
            var deferred = $q.defer();

            $http({
                method: 'POST',
                url: Base_Url + 'api/Account/ChangePassword',
                headers: {Authorization: 'Bearer ' + sessionStorage['userToken']},
                data: password
            })
                .then(function (success) {
                    deferred.resolve(success);
                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        return {
            login: getUserToken,
            register: register,
            logout: logout,
            me: me,
            all: all,
            changePassword: changePassword
        }
    }]);

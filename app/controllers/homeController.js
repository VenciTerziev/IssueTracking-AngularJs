'use strict';

angular.module('issueTracker.home', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'views/home/main.html',
            controller: 'HomeController'
        });
    }])

    .controller('HomeController', [
        '$rootScope', 'issues', '$scope', '$location',
        function($rootScope, issues, $scope, $location) {
            if(!$rootScope.template){
                $rootScope.template = 'views/home/welcome.html';
            }

            if(sessionStorage['userToken']){
                loadDashboard(4, 1, 'DueDate desc');
            }

            $rootScope.home = function () {
                if(sessionStorage['userToken']){
                    $location.path('#/');
                    loadDashboard(4, 1, 'DueDate desc');
                } else {
                    $rootScope.template = "views/home/welcome.html";
                }
            };

            $rootScope.login = function() {
                $rootScope.template = "views/user/login.html";
            };

            $rootScope.register = function() {
                $rootScope.template = "views/user/register.html";
            };

            function loadDashboard(pageSize, pageNumber, orderBy){
                $rootScope.template = 'views/home/logged/dashboard.html';
                issues.getUserIssues(pageSize, pageNumber, orderBy)
                    .then(function (success) {
                        if (success.data.Issues.length == 0){
                            $scope['current'] = 1;
                            $scope['total'] = 1;
                            $scope['haveIssues'] = false;
                        } else {

                            var issues = [];
                            for (var i = 0; i <  success.data.Issues.length; i++) {
                                var description = success.data.Issues[i].Description;

                                if(description.length > 75){
                                    success.data.Issues[i].Description = description.slice(0, 75) + '...';
                                }
                                issues.push(success.data.Issues[i]);

                            }

                            $scope['issues'] = issues;

                            var pages = [];
                            for (var i = 0; i < success.data.TotalPages; i++) {
                                pages.push(i + 1);
                            }
                            $scope['pages'] = pages;
                            $scope['current'] = pageNumber;
                            $scope['total'] = success.data.TotalPages;
                            $scope['haveIssues'] = true;
                        }

                    }, function(error){
                        console.log(error);
                    });
            }

            $scope.changePage = function (page) {
                loadDashboard(4, page, 'DueDate desc');
            }
        }
    ]);
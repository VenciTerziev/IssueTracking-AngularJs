'use strict';

angular.module('issueTracker.home', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'views/home/main.html',
            controller: 'HomeController'
        });
    }])

    .controller('HomeController', [
        '$rootScope', 'issues', '$scope', '$location', 'projects',
        function($rootScope, issues, $scope, $location, projects) {
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

                loadIssues(pageSize, pageNumber, orderBy);
                loadProjects(15, pageNumber);
            }

            function loadIssues(pageSize, pageNumber, orderBy){
                issues.getUserIssues(pageSize, pageNumber, orderBy)
                    .then(function (success) {
                        if (success.data.Issues.length == 0){
                            $scope['IssuesCurrent'] = 1;
                            $scope['IssuesTotal'] = 1;
                            $scope['haveIssues'] = false;
                        } else {

                            var issues = [];
                            for (var i = 0; i <  success.data.Issues.length; i++) {
                                var description = success.data.Issues[i].Description;
                                var title = success.data.Issues[i].Title;

                                if(description.length > 60){
                                    success.data.Issues[i].Description = description.slice(0, 60) + '...';
                                }

                                if(title.length > 35){
                                    success.data.Issues[i].Title = title.slice(0, 35) + '...';
                                }

                                issues.push(success.data.Issues[i]);

                            }

                            $scope['issues'] = issues;

                            var pages = [];
                            for (var i = 0; i < success.data.TotalPages; i++) {
                                pages.push(i + 1);
                            }
                            $scope['IssuesPages'] = pages;
                            $scope['IssuesCurrent'] = pageNumber;
                            $scope['IssuesTotal'] = success.data.TotalPages;
                            $scope['haveIssues'] = true;
                        }

                    }, function(error){
                        console.log(error);
                    });
            }

            function loadProjects(pageSize, pageNumber){
                projects.getProjects(pageSize, pageNumber)
                    .then(function (success) {
                        if (success.data.Projects.length == 0){
                            $scope['ProjectsCurrent'] = 1;
                            $scope['ProjectsTotal'] = 1;
                            $scope['haveProjects'] = false;
                        } else {
                            $scope['projects'] = success.data.Projects;

                            var pages = [];
                            for (var i = 0; i < success.data.TotalPages; i++) {
                                pages.push(i + 1);
                            }
                            $scope['ProjectsPages'] = pages;
                            $scope['ProjectsCurrent'] = pageNumber;
                            $scope['ProjectsTotal'] = success.data.TotalPages;
                            $scope['haveProjects'] = true;
                        }
                    }, function (error) {
                        console.log(error);
                    })
            }

            $scope.changeProjectsPage = function (page) {
                loadProjects(15, page);
            };

            $scope.changeIssuesPage = function (page) {
                loadIssues(4, page, 'DueDate desc');
            }
        }
    ]);
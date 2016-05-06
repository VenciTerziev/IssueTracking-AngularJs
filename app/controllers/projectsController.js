'use strict';

angular.module('issueTracker.projects', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/projects/:id', {
            templateUrl: 'views/projects/project.html',
            controller: 'ProjectController'
        });

        $routeProvider.when('/projects', {
            templateUrl: 'views/projects/allProjects.html',
            controller: 'AllProjectsController'
        });
    }])

    .controller('ProjectController', ['$scope', '$routeParams', 'projects', 'issues',
        function($scope, $routeParams, projects, issues){
            var id = $routeParams['id'];
            projects.getProjectById(id)
                .then(function (success) {
                    $scope['project'] = success.data;
                }, function (error) {
                    console.log(success);
                });

            getProjectIssues(10, 1, id);

            $scope.changePage = function (page) {
                getProjectIssues(10, page, id);
            };

            function getProjectIssues(pageSize, pageNumber, id){
                issues.getProjectIssues(pageSize, pageNumber, id)
                    .then(function (success) {
                        for (var i = 0; i < success.data.Issues.length; i++) {
                            var obj = success.data.Issues[i];
                            if(obj.Description.length > 40){
                                success.data.Issues[i].Description = obj.Description.slice(0, 40) + '...';
                            }
                        }

                        $scope.issues = success.data.Issues;
                        var pages = [];
                        for (var i = 0; i < success.data.TotalPages; i++) {
                            pages.push(i + 1);
                        }
                        $scope['pages'] = pages;
                        $scope['current'] = pageNumber;
                        $scope['total'] = success.data.TotalPages;
                    }, function (error) {
                        console.log(error);
                    })
            }
        }
    ])

    .controller('AllProjectsController', ['$scope', 'projects', '$location',
        function ($scope, projects, $location) {
            loadProjects(20, 1);

            function loadProjects(pageSize, pageNumber){
                projects.getProjects(pageSize, pageNumber)
                    .then(function (success) {
                            for (var i = 0; i < success.data.Projects.length; i++) {
                                var obj = success.data.Projects[i];
                                if(obj.Name.length > 25) {
                                    success.data.Projects[i].Name = success.data.Projects[i].Name.slice(0, 25) + '...';
                                }
                            }
                            $scope['projects'] = success.data.Projects;

                            var pages = [];
                            for (var i = 0; i < success.data.TotalPages; i++) {
                                pages.push(i + 1);
                            }
                            $scope['pages'] = pages;
                            $scope['current'] = pageNumber;
                            $scope['total'] = success.data.TotalPages;
                        },
                        function(error){
                            console.log(error);
                        });
            }

            $scope.changePage = function (page) {
                loadProjects(20, page);
            };

            $scope.showProject = function (id) {
                $location.path('/projects/' + id);
            }
    }]);



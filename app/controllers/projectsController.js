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

    .controller('ProjectController', ['$scope', '$routeParams',
        function($scope, $routeParams){
            $scope.id = $routeParams.id;
        }
    ])

    .controller('AllProjectsController', ['$scope', function ($scope) {

    }]);



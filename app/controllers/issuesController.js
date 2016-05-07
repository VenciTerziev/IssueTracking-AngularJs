'use strict';

angular.module('issueTracker.issuesController', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/projects/:id/add-issue', {
            templateUrl: 'views/issues/add-issue.html',
            controller: 'AddIssueController'
        });
    }])

    .controller('AddIssueController', [
        'issues', '$scope', '$routeParams', 'projects', 'authentication','$location', 'notifications',
        function(issues, $scope, $routeParams, projects, authentication, $location, notifications) {
            if (!sessionStorage.hasOwnProperty('userToken')) {
                $location.path('/#/');
            } else {
                authentication.all()
                    .then(function (success) {
                        var filtered = [];
                        angular.forEach(success.data, function (item) {
                            filtered.push(item);
                        });
                        filtered.sort(function (a, b) {
                            return (a['Username'] > b['Username'] ? 1 : -1);
                        });
                        $scope.users = filtered;
                    }, function (error) {
                        console.log(error);
                    });

                projects.getProjectById($routeParams['id'])
                    .then(function (success) {
                        console.log(success);
                        $scope.issue = {
                            Project: success.data.Name,
                            ProjectId: success.data.Id,
                            Priorities: success.data.Priorities
                        };
                    }, function (error) {

                    });

                $scope.addIssue = function (issue) {
                    if (issue.Labels == undefined) {
                        issue.Labels = [];
                    } else {
                        var labels = issue.Labels.split(', ');
                        for (var i = 0; i < labels.length; i++) {
                            labels[i] = {Name: labels[i]};
                        }
                        issue.Labels = labels;
                    }

                    issues.addIssue(issue)
                        .then(function (success) {
                            $location.path('/projects/' + $routeParams['id'])
                            notifications.showSuccess('Issue added successfully!')
                        }, function (error) {
                            var errors = error.data.ModelState;
                            for(var e in errors){
                                notifications.showError(errors[e][0]);
                            }
                        })
                }
            }
        }
    ]);
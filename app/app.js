'use strict';

// Declare app level module which depends on views, and components
angular.module('issueTracker', [
        'ngRoute',
        'ngNotificationsBar',
        'issueTracker.home',
        'issueTracker.users',
        'issueTracker.userModel',
        'issueTracker.projects',
        'issueTracker.issuesModel',
        'issueTracker.projectsModel'
    ])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/', controller: 'MenuController'})
    }])
    .controller('MenuController', ['$scope', function ($scope) {
        if(!sessionStorage['userToken']){
            $scope.menu = 'views/home/default/menu.html';
        } else {
            $scope.menu = 'views/home/logged/menu.html';
            $scope.username = sessionStorage['username'];
        }
    }])
    .config(['notificationsConfigProvider', function (notificationsConfigProvider) {
        notificationsConfigProvider.setAutoHide(true);

        notificationsConfigProvider.setHideDelay(1000);

        notificationsConfigProvider.setAcceptHTML(false);

        notificationsConfigProvider.setAutoHideAnimation('fadeOutNotifications');

        notificationsConfigProvider.setAutoHideAnimationDelay(750);
    }])
    .constant('Base_Url', 'http://softuni-issue-tracker.azurewebsites.net/');
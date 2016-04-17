'use strict';

// Declare app level module which depends on views, and components
angular.module('issueTracker', [
        'ngRoute',
        'ngNotificationsBar',
        'issueTracker.home',
        'issueTracker.users',
        'issueTracker.userModel'
    ])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/'})
    }])
    .config(['notificationsConfigProvider', function (notificationsConfigProvider) {
        notificationsConfigProvider.setAutoHide(true);

        notificationsConfigProvider.setHideDelay(1500);

        notificationsConfigProvider.setAcceptHTML(false);

        notificationsConfigProvider.setAutoHideAnimation('fadeOutNotifications');

        notificationsConfigProvider.setAutoHideAnimationDelay(1000);
    }])
    .constant('Base_Url', 'http://softuni-issue-tracker.azurewebsites.net/');
'use strict';

// Declare app level module which depends on views, and components
angular.module('issueTracker', [
  'ngRoute',
  'issueTracker.home'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/'});
}]);

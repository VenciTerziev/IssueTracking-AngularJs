'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', function($scope) {
  var studentObj = {
    "name": "Pesho",
    "photo": "http://www.nakov.com/wp-content/uploads/2014/05/SoftUni-Logo.png",
    "grade": 5,
    "school": "High School of Mathematics",
    "teacher": "Gichka Pesheva",
  };

  $scope.Name = studentObj.name;
  $scope.Photo = studentObj.photo;
  $scope.Grade = studentObj.grade;
  $scope.School = studentObj.school;
  $scope.Teacher = studentObj.teacher;
}]);
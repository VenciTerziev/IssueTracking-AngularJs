'use strict';

angular.module('issueTracker.projectsModel', [])
    .factory('projects', ['$http', '$q', 'Base_Url', function ($http, $q, Base_Url) {

        function getProjects(pageSize, pageNumber) {
            var deferred = $q.defer();

            var urlFormated = "projects/?pageSize=" + pageSize + "&pageNumber=" + pageNumber + '&filter=Lead.Id="'
                + sessionStorage['userId'] + '"' ;

            $http({
                method: 'GET',
                url: Base_Url + urlFormated,
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

        function getProjectById(id) {
            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: Base_Url + 'projects/' + id,
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

        function editProject(id, project) {
            var deferred = $q.defer();

            $http({
                method: 'PUT',
                url: Base_Url + 'projects/' + id,
                headers: {Authorization: 'Bearer ' + sessionStorage['userToken']},
                data: project
            })
                .then(function (success) {
                    deferred.resolve(success);
                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        return {
            getProjects: getProjects,
            getProjectById: getProjectById,
            editProject: editProject
        }
    }]);

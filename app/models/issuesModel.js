'use strict';

angular.module('issueTracker.issuesModel', [])
    .factory('issues', ['$http', '$q', 'Base_Url', function ($http, $q, Base_Url) {

        function getUserIssues(pageSize, pageNumber, orderBy) {
            var deferred = $q.defer();

            var urlFormated = "Issues/me?pageSize=" + pageSize + "&pageNumber=" + pageNumber+ "&orderBy=" + orderBy;

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



        return {
            getUserIssues: getUserIssues
        }
    }]);

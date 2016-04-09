'use strict';

// Declare app level module which depends on views, and components
angular.module('CVReader', [
  'ngRoute',
  'CVReader.read',
  'CVReader.edit',
  'CVReader.countContainer',
  'CVReader.version'
]).
factory('StandardData', ['$http', function($http) {
       return $http.get("./CVData/standard.json");
   }]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider
   .when('/read/:CVName', {
    templateUrl: 'read/read.html',
    controller: 'ReadCVCtrl'
  })
  .otherwise({redirectTo: '/read/standard'});
}]);

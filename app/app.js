'use strict';

// Declare app level module which depends on views, and components
angular.module('CVReader', [
  'ngRoute',
  'hc.marked',
  'CVReader.read',
  //'CVReader.edit',
  'CVReader.countContainer',
  'CVReader.timeline',
  'CVReader.version'
]).
factory('StandardData', ['$http', function($http) {
       return $http.get("./CVData/standard.json");
   }]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider
   .when('/read/:CVNames*', {
    templateUrl: 'read/read.html',
    controller: 'ReadCVCtrl'
  })
  .otherwise({redirectTo: '/read'});
}]);

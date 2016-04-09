'use strict';
{
	angular.module('CVReader.read', ['ngRoute'])

	.config(['$routeProvider', function($routeProvider) {
	  $routeProvider.when('/read', {
	    templateUrl: 'read/read.html',
	    controller: 'ReadCVCtrl',
	    title: "CV reader page"
	  });
	}])

	.controller('ReadCVCtrl', ['$scope', '$http', '$q', '$timeout', '$routeParams', '$rootScope', 'StandardData', ReadCVCtrl]);

	function ReadCVCtrl($scope, $http, $q, $timeout, $routeParams, $rootScope, SData) {
		var myData = {
				treated : false
			},
			name = $routeParams.CVName,
			chain = $q.when(SData).then(
				function(_standard){
					angular.extend(myData, _standard.data);
					$scope.serialized = JSON.stringify(myData);
					$rootScope.progress = "..";
				}
			);
		$rootScope.title = $scope.title = "My CV reader";
		$scope.CVName = name;
		$rootScope.loading = true;
		$rootScope.progress = ".";
		$scope.serialized = JSON.stringify(myData);
		if(name != "standard"){
			chain = chain.then(
					$http.get('/CVData/' + name + ".json")
					.then(function _success(response) {
						angular.extend(myData, response);
						$rootScope.progress = "...";
						$scope.serialized = JSON.stringify(myData);
					  }, function _error(response) {
						$scope.serialized = JSON.stringify(myData);
						$rootScope.progress = "...";
						$rootScope.loading = false;
					  })//overlay a new object over the standard CV
			);
		}
		$q.all([
			$timeout(1200),//let the user enjoy my loader anim :D
			chain
		]).then(function(){
			console.log(myData);
			TreatCV(myData, $scope, $rootScope);
		})
	}
	function TreatCV(_data, $scope, $rootScope){
		_data.treated = true;
		$scope.serialized = JSON.stringify(_data);
		$rootScope.loading = false;
		$scope.loading = false;
		$scope.CVData = _data;
		console.log(_data);
	}
}
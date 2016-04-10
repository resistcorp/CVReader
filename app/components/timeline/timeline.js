{//polluting is bad
	function TimelineController($scope) {
		console.log("timeline :", $scope);
	}

	angular.module('CVReader.timeline', [])
	.directive('cvTimeline',function(){
	  return {
	  	scope : {
	  		dates : "="
	  	},
		controller : ['$scope',
		  TimelineController
		],
	  	restrict: 'E',
	  	templateUrl: 'components/timeline/timeline.html'
	  };
	});
}
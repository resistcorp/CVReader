{//polluting is bad
	function TimelineController($scope) {
		console.log("timeline :", $scope);
		$scope.getPeriodClass = getPeriodClass;
		$scope.$watch(function(){
			console.log("change in scope for timeline", JSON.stringify($scope.workPeriods, null, "  "), JSON.stringify($scope.dates, null, "  "));
		})
	}
	function getPeriodClass(_period){
		ret = ['period'];
		if(_period.isPlaceHolder)
			ret.push('placeholder');
		return ret;
	}

	angular.module('CVReader.timeline', [])
	.directive('cvTimeline',function(){
	  return {
	  	/*scope : {
	  		workPeriods : "=",
	  		dates : "="
	  	},*/
		controller : ['$scope',
		  TimelineController
		],
	  	restrict: 'E',
	  	templateUrl: 'components/timeline/timeline.html'
	  };
	});
}
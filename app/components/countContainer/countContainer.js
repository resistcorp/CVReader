{
	function CountContainerController($scope) {
		console.log("controller called", $scope, $scope.data);
		$scope.sections = [];
		if($scope.data && $scope.data.sections){
			console.log("sections", $scope.data.sections);
			for(var s in $scope.data.sections){
				console.log(s, $scope.data.sections[s]);
				$scope.sections.push($scope.data.sections[s]);
			}
		}else{
			console.log("no sections", $scope.data);
		}
	}

	angular.module('CVReader.countContainer', [])
	.directive('cvCountContainer',function(){
	  return {
	  	scope : {
	  		data : "="
	  	},
		controller : ['$scope',
		  CountContainerController
		],
	  	restrict: 'E',
	  	templateUrl: 'components/countContainer/countContainer.html'
	  };
	});
}
{//don't pollute
	function CountContainerController($scope) {
		$scope.getClassForValue = function(_section, _i, _max){
			if(_i/_max <= _section.score)
				return "yes";
			return "no";
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
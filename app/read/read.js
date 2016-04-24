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
		var names = $routeParams.CVNames? $routeParams.CVNames.split('/') : [],
			myData = {
				treated : false
			},
			overlays = {},
			chain = $q.when(SData).then(
				function(_standard){
					angular.merge(myData, _standard.data);
					$scope.serialized = JSON.stringify(myData);
					$rootScope.progress = "..";
				}
			),
			promises = [
				$timeout(1200)//let the user enjoy my loader anim :D
			];
		$rootScope.title = $scope.title = "My CV reader";
		$scope.CVName = name;
		$rootScope.loading = true;
		$rootScope.progress = ".";
		$scope.serialized = JSON.stringify(myData);
		for (var i = 0; i < names.length; i++) {
			if(names[i] != ""){
				var name = names[i];
				promises.push(loadJsonIntoObject(name, overlays, $http));
			}
		}
		$q.all(promises).then(function(){
			for (var i = 0; i < names.length; i++) {
				var name = names[i];
				if(overlays[name]){
					//console.log("extending", myData, "with", overlays[name], overlays[name].head.title);
					//overlay a new object over the current CV data
					angular.merge(myData, overlays[name]);
					//console.log("result :", myData, overlays[name]);
					$rootScope.progress = "...";
					$scope.serialized = JSON.stringify(myData);
				}
			}
			console.log("final data :",myData);
			TreatCV(myData, $scope, $rootScope);
		})
	}
	function loadJsonIntoObject(_name, _obj, $http){
		return $http.get('./CVData/' + _name + ".json")
						.then(function _success(response) {
							_obj[_name] = response.data;
						  })
	}
	function TreatCV(_data, $scope, $rootScope){
		_data.treated = true;
		$scope.serialized = JSON.stringify(_data);
		$rootScope.loading = false;
		$scope.loading = false;
		$scope.CVData = _data;
		// sort skillset and techs, and expose them as an array
		//they are stored as objects to be easily overwritten
		for(let collection of [_data.body.SkillSet, _data.body.Techs]){
			var array = [], i = 1;
			for(var s in collection.sections){
				var section = collection.sections[s];
				if(isNaN(section.order))
					section.order = 0.1 + i++;
				section.id = s
				array.push(section);
			}
			array.sort(compareSections);
			collection.sortedSections = array;
		}
		//create one datapoint for every year of the timeline
		//so that they can be displayed ( or not :) )
		//One day I'll do it like this ♥
		/*function* yearGen(){
			var year = _data.body.timelineStart;
			var end = _data.body.timelineEnd;
			if(end == "now" || isNaN(end)){
				end = new Date().year
			}
			if(year > end){
				[year, end] = [end, year];
			}
			while(year <= end){
				var ret = {
					year : year
				}
				year++;
				yield ret;
			}
		}
		$scope.dates = [for (x of yearGen) x];*/
		var year = parseInt(_data.body.timelineStart);
		var end = parseInt(_data.body.timelineEnd);
		if(end == "now" || isNaN(end)){
			end = new Date().getFullYear();
		}
		if(year > end){
			[year, end] = [end, year];
		}
		{
			$scope.dates = [];
			$scope.workPeriods = [];
			$scope.datesByYear = {};

			for(;year <= end; year++){
				var ret = {
					year : year,
					used : false
				}
				$scope.datesByYear["y" + year] = ret;
				$scope.dates.push(ret);
			}
		}
		{
			var year, yFrom, yTo, sliceSize;
			$scope.sliceSize = sliceSize = 100 / ($scope.dates.length -1);
			$scope.workPeriods = [];
			for(let event of _data.body.events){
				year = event.date;
				if(year == 'now')
					year = new Date().getFullYear();
				$scope.datesByYear["y" + year].used = true;
				event.isAcademic = event.type == "A"
			}
			for(let period of _data.body.periods){
				yFrom = period.from;
				if(yFrom == 'now')
					period.from = yFrom = new Date().getFullYear();
				$scope.datesByYear["y" + yFrom].used = true;
				yTo = period.to;
				if(yTo == 'now')
					period.to = yTo = new Date().getFullYear();
				$scope.datesByYear["y" + yTo].used = true;
				period.length = yTo - yFrom;
				period.width = period.length * sliceSize;
				period.isAcademic = period.type == "A"
				if(!period.isAcademic){
					$scope.workPeriods.push(period);
				}
			}
			yTo = end;
			for (var i = $scope.workPeriods.length - 1; i >= 0; i--) {
				var period = $scope.workPeriods[i];
				while(yTo > period.to){
					$scope.workPeriods.splice(i+1, 0, {isPlaceHolder : true, length: 1, width : sliceSize})
					yTo--;
				}
				yTo = period.from;
			}
			console.log("treated CV : ", $scope);
		}
		$scope.getPeriodClass = getPeriodClass;
	}
	function comparePeriods(_a, _b){
		return _a.from - _b.from;
	}
	function compareSections(_a, _b){
		return _a.order - _b.order;
	}
}
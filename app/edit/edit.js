'use strict';
{
	angular.module('CVReader.edit', ['ngRoute'])

	.config(['$routeProvider', function($routeProvider) {
	  $routeProvider.when('/edit', {
	    templateUrl: 'edit/edit.html',
	    controller: 'EditCtrl'
	  });
	}])

	.controller('EditCtrl', [EditCtrl]);

	function EditCtrl() {
		//to do later
	}
}
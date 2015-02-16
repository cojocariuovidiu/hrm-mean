'use strict';

angular.module('manageApp')
  .controller('RelieveCtrl',['$rootScope', '$scope', '$location',
  	function ($scope, $rootScope, $location) {
	//console.log("xzxz",$rootScope.employee)
    if(typeof $rootScope.employee=="undefined"){
       return $location.path('/');
	};

	$scope.back = function() {
    	$location.path('/');
    };

  }]);
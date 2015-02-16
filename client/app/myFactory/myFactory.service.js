'use strict';

angular.module('manageApp')
  .factory("myFactory",function($http) {
  // Define the myFactory function
  var myFactory = function(id) {
    // Define the initialize function
    this.initialize = function() {
      // Fetch the hr from myFactory
      var url = '/api/hr/'+ id;
      var playerData = $http.get(url);
      var self = this;
      //When our $http promise resolves, Use angular.extend to extend 'this' with the properties of response
      playerData.then(function(response) {
        angular.extend(self, response.data); 
      });
    };
    // Call the initialize function for every new instance
    this.initialize();
  };
  // Return a reference to the function
  return (myFactory);
});
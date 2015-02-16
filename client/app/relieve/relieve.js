'use strict';

angular.module('manageApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('relieve', {
        url: '/relieve',
        templateUrl: 'app/relieve/relieve.html',
        controller: 'RelieveCtrl'
      });
  });
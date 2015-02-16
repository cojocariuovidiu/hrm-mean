'use strict';

angular.module('manageApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('tabs', {
        url: '/tabs',
        templateUrl: 'app/tabs/tabs.html',
        controller: 'TabsCtrl'
      });
  });
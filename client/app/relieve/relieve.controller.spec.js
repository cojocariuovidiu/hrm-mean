'use strict';

describe('Controller: RelieveCtrl', function () {

  // load the controller's module
  beforeEach(module('manageApp'));

  var RelieveCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RelieveCtrl = $controller('RelieveCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});

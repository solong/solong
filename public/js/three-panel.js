var app = angular.module('threePanel', []);
app.directive('threePanel', function() {
  return {
    restrict : 'A',

    templateUrl : '/assets/templates/three-panel.html',
  /*
   * transclude : true, controller : [ '$scope', '$http', '$routeParams',
   * '$location', function($scope, $http, $routeParams, $location) { } ],
   *
   * link : function(scope, iElement, iAttrs) { },
   */

  }
});

var app = angular.module('map', []);
app.directive('map', function() {
  return {
    restrict : 'A',

    templateUrl : '/assets/templates/map.html',
  /*
   * transclude : true, controller : [ '$scope', '$http', '$routeParams',
   * '$location', function($scope, $http, $routeParams, $location) { } ],
   *
   * link : function(scope, iElement, iAttrs) { },
   */

  }
});

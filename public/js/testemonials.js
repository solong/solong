var app = angular.module('testemonials', []);
app.directive('testemonials', function() {
  return {
    restrict : 'A',

    templateUrl : '/assets/templates/testemonials.html',
  /*
   * transclude : true, controller : [ '$scope', '$http', '$routeParams',
   * '$location', function($scope, $http, $routeParams, $location) { } ],
   *
   * link : function(scope, iElement, iAttrs) { },
   */

  }
});

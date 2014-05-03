var app = angular.module('headline', []);
app.directive('headline', function() {
  return {
    restrict : 'A',

    templateUrl : '/assets/templates/headline.html',
  /*
   * transclude : true, controller : [ '$scope', '$http', '$routeParams',
   * '$location', function($scope, $http, $routeParams, $location) { } ],
   *
   * link : function(scope, iElement, iAttrs) { },
   */

  }
});

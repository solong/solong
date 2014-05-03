var app = angular.module('newsletter', []);
app.directive('newsletter', function() {
  return {
    restrict : 'A',

    templateUrl : '/assets/templates/newsletter.html',
  /*
   * transclude : true, controller : [ '$scope', '$http', '$routeParams',
   * '$location', function($scope, $http, $routeParams, $location) { } ],
   *
   * link : function(scope, iElement, iAttrs) { },
   */

  }
});

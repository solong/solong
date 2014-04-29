var app = angular.module('carousel', []);
app.directive('carousel', function() {
  return {
    restrict : 'A',

    templateUrl : '/assets/templates/carousel.html',
  /*
   * transclude : true, controller : [ '$scope', '$http', '$routeParams',
   * '$location', function($scope, $http, $routeParams, $location) { } ],
   *
   * link : function(scope, iElement, iAttrs) { },
   */
    
  }
});

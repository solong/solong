var app = angular.module('header', []);
app.directive('header', function() {
  return {
    restrict : 'A',

    templateUrl : '/assets/templates/header.html',
  /*
   * transclude : true, controller : [ '$scope', '$http', '$routeParams',
   * '$location', function($scope, $http, $routeParams, $location) { } ],
   *
   * link : function(scope, iElement, iAttrs) { },
   */

  }
});

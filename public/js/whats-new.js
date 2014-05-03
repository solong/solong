var app = angular.module('whatsNew', []);
app.directive('whatsNew', function() {
  return {
    restrict : 'A',

    templateUrl : '/assets/templates/whatsnew.html',
  /*
   * transclude : true, controller : [ '$scope', '$http', '$routeParams',
   * '$location', function($scope, $http, $routeParams, $location) { } ],
   *
   * link : function(scope, iElement, iAttrs) { },
   */

  }
});

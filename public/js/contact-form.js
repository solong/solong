var app = angular.module('contactForm', []);
app.directive('contactForm', function() {
  return {
    restrict : 'A',

    templateUrl : '/assets/templates/contactform.html',
  /*
   * transclude : true, controller : [ '$scope', '$http', '$routeParams',
   * '$location', function($scope, $http, $routeParams, $location) { } ],
   *
   * link : function(scope, iElement, iAttrs) { },
   */

  }
});

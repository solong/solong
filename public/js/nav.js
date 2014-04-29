var app = angular.module('navigation', []);
app.directive('navigation', function() {
  return {
    restrict : 'A',

    
    templateUrl : '/assets/templates/nav.html',

    controller : [ '$scope', '$http', '$routeParams', '$location', function($scope, $http, $routeParams, $location) {
      //$scope.routeParams = $routeParams;
      $scope.routeParams = $routeParams;
      $scope.locationPath = $location.path();
    } ],

    link : function(scope, iElement, iAttrs) {
    },

  }
});



'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]).
config(['$routeProvider','$locationProvider', function($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $routeProvider.when('/', {templateUrl: '/assets/partials/about.html', controller: 'AboutCtrl'});
  $routeProvider.when('/contact', {templateUrl: '/assets/partials/contact.html', controller: 'ContactCtrl'});
  $routeProvider.when('/development', {templateUrl: '/assets/partials/development.html', controller: 'DevelopmentCtrl'});
  //repeat this line as many times as necessary $routeProvider.when('/sync', {templateUrl: '/assets/partials/sync.html', controller: 'SyncCtrl'});
  //$routeProvider.when('/openIDCallback', {templateUrl: '/assets/partials/partial2.html', controller: 'MyCtrl3'});
  $routeProvider.otherwise({redirectTo: '/'});
}]);

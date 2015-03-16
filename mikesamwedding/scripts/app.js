'use strict';

// Declare app level module which depends on filters, and services
var reunion = angular.module('reunion', ['ngRoute']);

reunion.config(['$routeProvider', function ($routeProvider) {
  //these are the items that show up in the navigation - in this order
	$routeProvider.when('/', { templateUrl: 'views/home.html', controller: 'NullCtrl', title: 'Home', caseInsensitiveMatch: true, navigation: true });
  $routeProvider.when('/itinerary', { templateUrl: 'views/itinerary.html', controller: 'NullCtrl', title: 'Itinerary', caseInsensitiveMatch: true, navigation: true });
  $routeProvider.when('/registry', { templateUrl: 'views/registry.html', controller: 'NullCtrl', title: 'Registry', caseInsensitiveMatch: true, navigation: true });
  $routeProvider.when('/accommodations', { templateUrl: 'views/accommodations.html', controller: 'NullCtrl', title: 'Accommodations', caseInsensitiveMatch: true, navigation: true });
  $routeProvider.when('/activities', { templateUrl: 'views/activities.html', controller: 'NullCtrl', title: 'Activities', caseInsensitiveMatch: true, navigation: true });
  $routeProvider.when('/directions', { templateUrl: 'views/directions.html', controller: 'NullCtrl', title: 'Directions', caseInsensitiveMatch: true, navigation: true });
	$routeProvider.otherwise({ redirectTo: '/' });
}]);

reunion.config(["$httpProvider", function ($httpProvider) {
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);

reunion.run(['$rootScope', '$route', '$location', function ($rootScope, $route, $location) {
  //ensure the title is right on first hit to the login page
  $rootScope.currentRoute = { path: '/', title: 'Home' };

  //build up our site map based on the routes
  $rootScope.routes = [];
  for (var i in $route.routes) {
    var route = { path: i, route: $route.routes[i] };
    if (!route.route.navigation)
      continue;
    route.route.path = route.path;
    $rootScope.routes.push(route.route);
  }

  //When we change pages
  //find the route with the matching path, set it to be the current so the title and footer nav will update
  $rootScope.$on("$routeChangeSuccess", function (currentRoute, previousRoute) {
  	for (var r in $rootScope.routes) {
  		if ($rootScope.routes[r].path === $route.current.originalPath)
  			$rootScope.currentRoute = $rootScope.routes[r];
  	}
  });
  
  //called by the dropdown footer nav
  $rootScope.redirect = function () {
    $location.path($rootScope.currentRoute.path);
  };

}]);

reunion.controller('NullCtrl', function () { });
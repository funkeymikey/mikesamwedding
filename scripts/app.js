'use strict';

// Declare app level module which depends on filters, and services
var reunion = angular.module('reunion', ['ngRoute', 'ngResource', 'reunion.controllers', 'ngResponsiveImages', 'ngSanitize']);
//'reunion.directives', 'reunion.filters', 'reunion.services',

reunion.config(['$routeProvider', function ($routeProvider) {

  //these are the items that show up in the navigation - in this order
  $routeProvider.when('/', { templateUrl: 'views/home.html', controller: 'HomeCtrl', title: 'Home', caseInsensitiveMatch: true, navigation:true });
  $routeProvider.when('/itinerary', { templateUrl: 'views/itinerary.html', controller: 'ItineraryCtrl', title: 'Itinerary', caseInsensitiveMatch: true, navigation: true });
  $routeProvider.when('/registry', { templateUrl: 'views/registry.html', controller: 'NullCtrl', title: 'Registry', caseInsensitiveMatch: true, navigation: true });
  $routeProvider.when('/directions', { templateUrl: 'views/directions.html', controller: 'DirectionsCtrl', title: 'Directions', caseInsensitiveMatch: true, navigation: true });
  
  //other routes  
  //$routeProvider.when('/album/:albumId', { templateUrl: 'views/album.html', controller: 'AlbumCtrl', title: 'View Album', caseInsensitiveMatch: true });
  //$routeProvider.when('/item/:itemId', { templateUrl: 'views/item.html', controller: 'ItemCtrl', title: 'View Item', caseInsensitiveMatch: true });
  //$routeProvider.when('/createAlbum', { templateUrl: 'views/createAlbum.html', controller: 'CreateAlbumCtrl', title: 'Create Album', caseInsensitiveMatch: true });
  //$routeProvider.when('/editAlbum/:albumId', { templateUrl: 'views/editAlbum.html', controller: 'EditAlbumCtrl', title: 'Edit Album', caseInsensitiveMatch: true });
  $routeProvider.otherwise({ redirectTo: '/' });

}]);

reunion.config(["$httpProvider", function ($httpProvider) {
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);

reunion.run(['$rootScope', '$route', '$resource', '$location', function ($rootScope, $route, $resource, $location) {
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
  // 1) check to see if we're not authenticated
  // 2) find the route with the matching path, set it to be the current so the title and footer nav will update
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



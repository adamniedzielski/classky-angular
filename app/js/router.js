angular.module("app").config(function ($routeProvider, $locationProvider) {

  $locationProvider.html5Mode(true);

  $routeProvider.when('/artists', {
    templateUrl: 'artists_list.html',
    controller: 'ArtistsListController'
  });

  $routeProvider.when('/artists/:id', {
    templateUrl: 'artist.html',
    controller: 'ArtistController'
  });  

  $routeProvider.otherwise({ redirectTo: '/artists' });
});

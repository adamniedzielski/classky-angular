
angular.module("app").controller("ArtistsListController", function ($scope, LastFMService) {
  LastFMService.getHypedArtists().then(function (result) {
    $scope.artists = result;
  });
});

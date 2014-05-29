
angular.module("app").
  controller("ArtistController", function ($scope, $routeParams, MusicBrainzService) {
    MusicBrainzService.getArtist($routeParams.id).
      then(function (result) {
        $scope.artist = result;
      });
  });

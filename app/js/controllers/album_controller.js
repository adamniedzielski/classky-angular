angular.module("app").
  controller("AlbumController", function ($scope, SpotifyService) {
    SpotifyService.getUrl($scope.artist.name, $scope.album.title).
      then(function (result) {
        $scope.album.spotifyUrl = result;
      });
  });
